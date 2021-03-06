--
--    Copyright (C) 2015 Infinite Automation Systems Inc. All rights reserved.
--    @author Terry Packer
--
create table excelReportTemplates (
  id int not null auto_increment,
  xid varchar(100) NOT NULL,
  name varchar(100) not null,
  userId int not null,
  editPermission varchar(255),
  reportReadPermission varchar(255),
  filename varchar(200) not null,
  fileStoreName varchar(100) not null,
  preventPurge char not null,
  schedule char not null,
  scheduleCron varchar(50) not null,
  email char not null,
  zipData char not null,
  emailTemplateFilename varchar(200) not null,
  data longblob NOT NULL,
  primary key (id)
);
alter table excelReportTemplates add constraint excelReportTemplatesFk1 foreign key (userId) references users(id) on delete cascade;

create table excelReports (
  id int not null auto_increment,
  xid varchar(100) NOT NULL,
  name varchar(100) not null,
  state int not null,
  errorMessage varchar(512),
  userId int not null,
  readPermission varchar(255),
  reportTemplateId int not null,
  filename varchar(200),
  reportRunTimestamp bigint,
  reportRunDuration bigint,
  recordCount int,
  preventPurge char not null,
  data longblob NOT NULL,
  primary key (id)
);
alter table excelReports add constraint excelReportsFk1 foreign key (userId) references users(id) on delete cascade;
alter table excelReports add constraint excelReportsFk2 foreign key (reportTemplateId) references excelReportTemplates(id) on delete cascade;

