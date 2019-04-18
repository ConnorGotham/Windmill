--
--  Copyright (C) 2013 Infinite Automation. All rights reserved.
--  @author Terry Packer
--
create table sqlDataSourceParameter (
  id int not null generated by default as identity (start with 1, increment by 1),
  dataPointId int not null,
  name varchar(20) not null,
  separator varchar(5) not null,
  position int not null
);
alter table dtmrMonitors add constraint sqlDataSourceParameter primary key (id);

