CREATE TABLE IF NOT EXISTS "entity" (
  "objid" varchar(50) NOT NULL,
  "entityno" varchar(100) NOT NULL,
  "name" longtext NOT NULL,
  "address_text" varchar(255) NOT NULL DEFAULT '',
  "mailingaddress" varchar(255) DEFAULT NULL,
  "type" varchar(25) NOT NULL,
  "sys_lastupdate" varchar(25) DEFAULT NULL,
  "sys_lastupdateby" varchar(50) DEFAULT NULL,
  "remarks" text,
  "entityname" varchar(800) DEFAULT NULL,
  "address_objid" varchar(50) DEFAULT NULL,
  "mobileno" varchar(25) DEFAULT NULL,
  "phoneno" varchar(25) DEFAULT NULL,
  "email" varchar(50) DEFAULT NULL,
  "state" varchar(25) DEFAULT NULL,
  PRIMARY KEY ("objid")
);

CREATE INDEX IF NOT EXISTS "ix_address_objid"
ON "entity" (
  "address_objid"
);

CREATE INDEX IF NOT EXISTS "ix_entityname"
ON "entity" (
  "name"
);

CREATE INDEX IF NOT EXISTS "ix_state"
ON "entity" (
  "state"
);

CREATE UNIQUE INDEX IF NOT EXISTS "uix_entityno"
ON "entity" (
  "entityno"
);

CREATE TABLE IF NOT EXISTS `entity_address` (
  `objid` varchar(50) NOT NULL DEFAULT '',
  `parentid` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `addresstype` varchar(50) DEFAULT NULL,
  `barangay_objid` varchar(50) DEFAULT NULL,
  `barangay_name` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `municipality` varchar(500) DEFAULT NULL,
  `bldgno` varchar(50) DEFAULT NULL,
  `bldgname` varchar(50) DEFAULT NULL,
  `unitno` varchar(50) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `subdivision` varchar(100) DEFAULT NULL,
  `pin` varchar(50) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`objid`)
	);

CREATE INDEX IF NOT EXISTS "ix_barangay_objid"
ON "entity_address" (
  "barangay_objid" ASC
);

CREATE INDEX IF NOT EXISTS "ix_parentid"
ON "entity_address" (
  "parentid" ASC
);

CREATE TABLE IF NOT EXISTS "entityindividual" (
  "objid" varchar(50) NOT NULL,
  "lastname" varchar(100) NOT NULL,
  "firstname" varchar(100) NOT NULL,
  "middlename" varchar(100) DEFAULT NULL,
  "birthdate" date DEFAULT NULL,
  "birthplace" varchar(160) DEFAULT NULL,
  "citizenship" varchar(50) DEFAULT NULL,
  "gender" varchar(10) DEFAULT NULL,
  "civilstatus" varchar(15) DEFAULT NULL,
  "profession" varchar(50) DEFAULT NULL,
  "tin" varchar(50) DEFAULT NULL,
  "sss" varchar(25) DEFAULT NULL,
  "height" varchar(10) DEFAULT NULL,
  "weight" varchar(10) DEFAULT NULL,
  "acr" varchar(50) DEFAULT NULL,
  "religion" varchar(50) DEFAULT NULL,
  "photo" mediumblob,
  "thumbnail" blob,
  PRIMARY KEY ("objid"),
  CONSTRAINT "entityindividual_ibfk_1" FOREIGN KEY ("objid") REFERENCES "entity" ("objid") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX IF NOT EXISTS "ix_fname"
ON "entityindividual" (
  "firstname" ASC
);

CREATE INDEX IF NOT EXISTS "ix_lfname"
ON "entityindividual" (
  "lastname" ASC,
  "firstname" ASC
);
