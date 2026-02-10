

CREATE TABLE public.passeports (
	id int2 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 32767 START 1 CACHE 1 NO CYCLE) NOT NULL,
	annee int2 NOT NULL,
	nom varchar(50) NOT NULL UNIQUE,
	code varchar(2) NOT NULL DEFAULT 'FR',
	tracabilite int2 NOT NULL,
	identifiant varchar(7) NOT NULL DEFAULT 'BR13551',
	origine varchar(2) NOT NULL,
	fichier int2 NULL, 
	CONSTRAINT passeport_pkey PRIMARY KEY (id)
);

CREATE TABLE public.echantillons (
	id int2 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 32767 START 1 CACHE 1 NO CYCLE) NOT NULL,
	type varchar(15) NOT NULL, 
	programme varchar(25) NOT NULL,
	site varchar(25) NOT NULL,
	responsable varchar(25) NOT NULL,
	identification varchar(16) NOT NULL,
	parent varchar(16) NOT NULL,
	libre varchar(30) NULL,
	prelevement date NOT NULL,
	peremption date NOT NULL,
	pays text NOT NULL,
	region text NOT NULL,
	pointx varchar(15) NOT NULL,
	pointy varchar(15) NOT NULL,
	passeport int2 NULL, 
	cultures jsonb NULL,
	stockage jsonb NULL,
    etiquette  jsonb NULL,
	etat varchar(10) NOT NULL, 
	CONSTRAINT echantillons_pkey PRIMARY KEY (id)
)

CREATE TABLE public.excels (
	id int2 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 32767 START 1 CACHE 1 NO CYCLE) NOT NULL,
	datas jsonb NULL
)

CREATE TABLE public.selections (
	id int2 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 32767 START 1 CACHE 1 NO CYCLE) NOT NULL,
	ids integer[],
)

CREATE TABLE public.fichiers (
	id int2 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 32767 START 1 CACHE 1 NO CYCLE) NOT NULL,
	nom character VARYING(1024),
	fichier BYTEA
);

CREATE TABLE public.configuration (
	nom varchar(6) NOT NULL UNIQUE default 'config', 
	params jsonb NULL
)

INSERT INTO configuration (params) VALUES ('{}');