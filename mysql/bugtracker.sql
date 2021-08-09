
create table projects (
	date_created datetime not null default current_timestamp,
	id int auto_increment,
	project varchar(128) not null,
    manager_id int,
    description varchar(256),
    primary key (id),
    foreign key (manager_id) references users (emp_id)
);

create index project on projects (project);

create table tickets (
	id int auto_increment,
	project_id int not null,
	date_created datetime not null default current_timestamp,
    submitter varchar(20),
    ticket_type enum ('issue', 'comment', 'other') not null,
    priority enum ('Low', 'Medium', 'High') not null,
    description varchar(255),
    status enum ('new', 'open', 'in progress', 'resolved', 'need additional info'),
    assigned_technician varchar(20),
    primary key (id),
    foreign key (project_id) references projects (id)
);

create table ticket_history (
	property varchar(64),
	old_value varchar(300),
	new_value varchar(300)
);

create table users (
	emp_id int primary key auto_increment, 
	social varchar(11) unique,
	first_name varchar(128),
	last_name varchar(128),
	address varchar(128),
	level enum('Junior', 'Middle', 'Senior'),
    username varchar(128) unique,
	email varchar(128) unique,
    password varchar(256),
    access varchar(10),
    role varchar(128),
    foreign key (role) references roles (role)
);
    
create table temporary_passwords (
	username varchar(128) primary key,
    password varchar(300),
    foreign key (username) references users (username)
);

create table roles (
	role varchar(128) primary key
);

create table privileges (
	privilege varchar(128) primary key
);
    
create table role_privileges (
	role varchar(128),
    privilege varchar(128),
    foreign key (role) references roles (role),
    foreign key (privilege) references privileges (privilege),
    primary key (role, privilege)
);

create or replace view tickets_v as
select id, project_id, projects_project project, submitter_id, submitter, date_created, ticket_type, priority, description, status, assigned_technician_id, assigned_technician
from
	(select * from tickets
join
	(select id projects_project_id, project projects_project from projects) as projects
on tickets.project_id = projects.projects_project_id
left join
	(select emp_id users_submitter_id, concat(first_name, ' ', last_name) submitter from users) b
on tickets.submitter_id = b.users_submitter_id
left join
	(select emp_id users_assigned_technician_id, concat(first_name, ' ', last_name) assigned_technician from users) c
on tickets.assigned_technician_id = c.users_assigned_technician_id) d
order by id;

create or replace view projects_v as
select id, project, date_created, manager_id, manager, description
from 
(select * from projects) a
left join
(select emp_id, concat(first_name, ' ', last_name) manager from users) b
on emp_id = manager_id;