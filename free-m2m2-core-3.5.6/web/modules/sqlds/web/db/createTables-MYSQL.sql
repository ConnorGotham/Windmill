--
--  Copyright (C) 2013 Infinite Automation. All rights reserved.
--  @author Terry Packer
--

-- Make sure that everything get created with utf8 as the charset.
alter database default character set utf8;

create table sqlDataSourceParameter (
  id int not null auto_increment,
  dataPointId int not null,
  name varchar(20) not null,
  separator varchar(5) not null,
  position int not null,
  primary key (id)
)engine=InnoDB;

