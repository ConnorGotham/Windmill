//>>built
require({cache:{"url:dojox/form/resources/VerticalRangeSlider.html":'\x3ctable class\x3d"dijitReset dijitSlider dijitSliderV dojoxRangeSlider" cellspacing\x3d"0" cellpadding\x3d"0" border\x3d"0" rules\x3d"none"\n\trole\x3d"presentation"\n\t\x3e\x3ctr class\x3d"dijitReset"\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV"\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderIncrementIconV" tabIndex\x3d"-1" style\x3d"display:none" dojoAttachPoint\x3d"decrementButton" dojoAttachEvent\x3d"onclick: increment"\x3e\x3cspan class\x3d"dijitSliderButtonInner"\x3e+\x3c/span\x3e\x3c/div\n\t\t\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\x3e\x3c/tr\n\t\x3e\x3ctr class\x3d"dijitReset"\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset"\n\t\t\t\x3e\x3ccenter\x3e\x3cdiv class\x3d"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper" dojoAttachEvent\x3d"onclick:_onClkIncBumper"\x3e\x3c/div\x3e\x3c/center\n\t\t\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\x3e\x3c/tr\n\t\x3e\x3ctr class\x3d"dijitReset"\n\t\t\x3e\x3ctd dojoAttachPoint\x3d"leftDecoration" class\x3d"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV" style\x3d"text-align:center;height:100%;"\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset" style\x3d"height:100%;"\n\t\t\t\x3e\x3cinput dojoAttachPoint\x3d"valueNode" type\x3d"hidden" ${!nameAttrSetting}\n\t\t\t/\x3e\x3ccenter role\x3d"presentation" style\x3d"position:relative;height:100%;" dojoAttachPoint\x3d"sliderBarContainer"\n\t\t\t\t\x3e\x3cdiv role\x3d"presentation" dojoAttachPoint\x3d"remainingBar" class\x3d"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV" dojoAttachEvent\x3d"onmousedown:_onRemainingBarClick"\n\t\t\t\t\t\x3e\x3cdiv class\x3d"dijitSliderMoveable dijitSliderMoveableV" style\x3d"vertical-align:top;" role\x3d"slider"\n\t\t\t\t\t\t\x3e\x3cdiv class\x3d"dijitSliderImageHandle dijitSliderImageHandleV" dojoAttachPoint\x3d"sliderHandle,focusNode" tabIndex\x3d"${tabIndex}" dojoAttachEvent\x3d"onkeypress:_onKeyPress,onmousedown:_onHandleClick"\x3e\x3c/div\n\t\t\t\t\t\x3e\x3c/div\n\t\t\t\t\t\x3e\x3cdiv role\x3d"presentation" dojoAttachPoint\x3d"progressBar" class\x3d"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV" dojoAttachEvent\x3d"onkeypress:_onKeyPress,onmousedown:_onBarClick"\n\t\t\t\t\t\x3e\x3c/div\n\t\t\t\t\t\x3e\x3cdiv class\x3d"dijitSliderMoveable dijitSliderMoveableV" style\x3d"vertical-align:top;" role\x3d"slider"\n\t\t\t\t\t\t\x3e\x3cdiv class\x3d"dijitSliderImageHandle dijitSliderImageHandleV" dojoAttachPoint\x3d"sliderHandleMax" tabIndex\x3d"${tabIndex}" dojoAttachEvent\x3d"onkeypress:_onKeyPress,onmousedown:_onHandleClickMax"\x3e\x3c/div\n\t\t\t\t\t\x3e\x3c/div\n\t\t\t\t\x3e\x3c/div\n\t\t\t\x3e\x3c/center\n\t\t\x3e\x3c/td\n\t\t\x3e\x3ctd dojoAttachPoint\x3d"containerNode,rightDecoration" class\x3d"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV" style\x3d"text-align:center;height:100%;"\x3e\x3c/td\n\t\x3e\x3c/tr\n\t\x3e\x3ctr class\x3d"dijitReset"\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset"\n\t\t\t\x3e\x3ccenter\x3e\x3cdiv class\x3d"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper" dojoAttachEvent\x3d"onclick:_onClkDecBumper"\x3e\x3c/div\x3e\x3c/center\n\t\t\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\x3e\x3c/tr\n\t\x3e\x3ctr class\x3d"dijitReset"\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV"\n\t\t\t\x3e\x3cdiv class\x3d"dijitSliderDecrementIconV" tabIndex\x3d"-1" style\x3d"display:none" dojoAttachPoint\x3d"incrementButton" dojoAttachEvent\x3d"onclick: decrement"\x3e\x3cspan class\x3d"dijitSliderButtonInner"\x3e-\x3c/span\x3e\x3c/div\n\t\t\x3e\x3c/td\n\t\t\x3e\x3ctd class\x3d"dijitReset"\x3e\x3c/td\n\t\x3e\x3c/tr\n\x3e\x3c/table\x3e\n'}});
define(["dojo/_base/declare","dojox/form/_RangeSliderMixin","dojo/text!./resources/VerticalRangeSlider.html","dijit/form/VerticalSlider"],function(a,b,c,d){return a("dojox.form.VerticalRangeSlider",[d,b],{templateString:c})});
//# sourceMappingURL=VerticalRangeSlider.js.map