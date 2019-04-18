--
--    Copyright (C) 2015 Infinite Automation Systems Inc. All rights reserved.
--    @author Terry Packer
--
create table excelReportTemplates (
  id int not null identity,
  xid nvarchar(100) NOT NULL,
  name nvarchar(100) not null,
  userId int not null,
  editPermission nvarchar(255),
  reportReadPermission nvarchar(255),
  filename nvarchar(200) not null,
  fileStoreName varchar(100) not null,
  preventPurge char(1) not null,
  schedule char(1) not null,
  scheduleCron nvarchar(50) not null,
  email char(1) not null,
  zipData char(1) not null,
  emailTemplateFilename varchar(200) not null,
  data image NOT NULL,
  primary key (id)
);
alter table excelReportTemplates add constraint excelReportTemplatesFk1 foreign key (userId) references users(id) on delete cascade;

create table excelReports (
  id int not null identity,
  xid nvarchar(100) NOT NULL,
  name nvarchar(100) not null,
  state int not null,
  errorMessage nvarchar(512),
  userId int not null,
  readPermission nvarchar(255),
  reportTemplateId int not null,
  filename nvarchar(200),
  reportRunTimestamp bigint,
  reportRunDuration bigint,
  recordCount int,
  preventPurge char(1) not null,
  data image NOT NULL,
  primary key (id)
);
alter table excelReports add constraint excelReportsFk1 foreign key (userId) references users(id) on delete cascade;
alter table excelReports add constraint excelReportsFk2 foreign key (reportTemplateId) references excelReportTemplates(id) on delete cascade;