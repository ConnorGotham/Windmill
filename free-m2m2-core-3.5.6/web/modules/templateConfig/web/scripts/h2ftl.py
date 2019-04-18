import re
import sys

if len(sys.argv) < 2 :
    input = open('/path/to/annotatedJson.extension', 'r')#path to the human marked template file
    output = open('/path/to/result.ftl', 'w+')#path to write the transposed FTL file to
else :
    input = open(sys.argv[1], 'r')
    output = open(sys.argv[2], 'w+')

buffer = ""
manifest = "<#--===MANIFEST===\n"

for line in input :
    m = re.search('^(\s*".*":)([^\n\r$]*)\$\$(.*?)\$\$(.*)$', line)
    g = re.search('^(.*?)%%(.+)%%(.*)$', line)
    if m is not None : #found a variable field.
        if len(m.group(2)) == 0 and len(m.group(4)) == 0 :
            mode = "field"
        elif len(m.group(2)) == 0 or m.group(2) == "\"" :
            mode = "prefix"
        elif len(m.group(4)) == 0 or m.group(4) == "\"":
            mode = "suffix"
        elif m.group(2) == "\"" and m.group(4) == "\"" :
            mode = "field"
        else :
            mode = "body"

        msg = m.group(3)
        propName = re.search('"(.*)"', m.group(1)).group(1)
        ident = propName + mode + msg

        #compose the segment we'll make the variable list from
        if manifest.find(propName + ":" + mode + ":" + msg) == -1 :
            manifest += propName + ":" + mode + ":" + msg + "\n"

        #compose the freemarker version of this file:
        buffer += m.group(1) + m.group(2) + "<#if " + ident.replace(" ","_") + "??>" + \
                  "${" + ident.replace(" ","_") + "}<#else>${default" + ident.replace(" ","_") + "}</#if>" + m.group(4) + "\n"
        
        #buffer += "\",\n" if (re.search(",", line) is not None) else "\"\n"

    elif g is not None : #global group
        ident = g.group(2) + "GlobalGlobal"
        if manifest.find(g.group(2) + ":Global") == -1 :
            manifest += g.group(2) + ":Global:Global\n"
        buffer += g.group(1) + "<#if " + ident.replace(" ","_") + "??>${" + ident.replace(" ","_") + "}<#else>${default" + \
            ident.replace(" ","_") + "}</#if>" + g.group(3) + "\n"
        
    else : #no variable match
        buffer += line

manifest += "===END MANIFEST===-->\n\n"

output.write(manifest)
output.write(buffer)

input.close()
output.close()
