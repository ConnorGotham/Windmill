--
--    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
--    @author Matthew Lohbihler
--
create table globalScripts (
  id int not null identity,
  xid nvarchar(100) not null,
  name nvarchar(100) not null,
  script ntext,
  primary key (id)
);
alter table globalScripts add constraint globalScriptsUn1 unique (xid);
