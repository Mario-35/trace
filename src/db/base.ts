import { Idb, Icolumn } from "../types";

const index: Icolumn = {
                type: "index" ,
                title: "Index",
                create: "int2 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 32767 START 1 CACHE 1 NO CYCLE) NOT NULL",
                list : false
            } 
            
export const dataBase: Idb = {
    "configuration": {
      "columns": {
        "id": index,
        "site": {
          type: "text",
          title: "Nom de l'unité",
          create: "varchar(25) NOT NULL",
          list : true                
        },
        "code": {
          type: "text",
          title: "Code Pays",
          create: "varchar(2) NOT NULL",
          list : true                
        },
        "pays": {
          type: "text",
          title: "Pays",
          create: "varchar(25) NOT NULL",
          list : true                
        },
        "region": {
          type: "text",
          title: "Région",
          create: "varchar(25) NOT NULL",
          list : true                
        },
        "pointx": {
          type: "text",
          title: "Point X",
          create: "varchar(15) NOT NULL",
          list: false
        },
        "pointy": {
          type: "text",
          title: "Point Y",
          create: "varchar(15) NOT NULL",
          list: false
        },        
        "identifiant": {
          type: "text",
          title: "Identifiant passeport",
          create: "varchar(10) NOT NULL",
          list : true                
        },
        "stockages": {
          type: "text[]",
          title: "Région",
          create: "text[] NOT NULL",
          list : true                
        },
        "etats": {
          type: "text[]",
          title: "Région",
          create: "text[] NOT NULL",
          list : true                
        },
        "etiquette": {
          type: "json",
          title: "Paramètres étiquettes",
          create: "jsonb NULL",
          list: false               
        }
      },
      "constraints" : []
    },
    "passeports" : {
        "columns": {
              "id": index,
              "nom": {
                type: "text" ,
                title: "Nom interne du passeport",
                create: "varchar(50) NOT NULL UNIQUE",
                list : true
              },
              "annee": {
                type: "number" ,
                title: "Année de délivrance",
                create: "int2 NOT NULL",
                list : true
              },
              "tracabilite": {
                type: "text" ,
                title: "Code de tracabilité",
                create: "int2 NOT NULL",
                list : true
              },
              "code": {
                type: "text" ,
                title: "Code pays",
                create: "varchar(2) NOT NULL DEFAULT 'FR'",
                list : true
              },
              "identifiant": {
                type: "text" ,
                title: "Identifiant",
                create: "varchar(7) NOT NULL DEFAULT 'BR13551'",
                list : false
              },
              "origine": {
                type: "text" ,
                title: "Pays origine",
                create: "varchar(2) NOT NULL",
                list : false
              },
              "fichier": {
                type: "text" ,
                title: "Fichier joint",
                create: "int2 NULL",
                list : false
              },
              
            }, 
            "constraints" : [
              "CONSTRAINT passeport_pkey PRIMARY KEY (id)"
            ]
    }, 
    "echantillons" : {
      "columns": {
            "id": {
                type: "index" ,
                title: "Index",
                create: "int8 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE) NOT NULL",
                list : false
            } ,
            "type": {
                type: "text",
                title: "Type de prélévement",
                create: "varchar(25) NOT NULL",
                list : false
              },
              "programme": {
                type: "text",
                title: "Nom du programme",
                create: "varchar(25) NOT NULL",
                list: true
              },
              "condition": {
                type: "text",
                title: "Condition de prélévement",
                create: "varchar(50) NOT NULL",
                list: false
              },
              "site": {
                type: "text",
                title: "Site de prélévement",
                create: "varchar(25) NOT NULL",
                list: true
              },
              "responsable": {
                type: "text",
                title: "Résponsable",
                create: "varchar(25) NOT NULL",
                list: true
              },
              "identification": {
                type: "text",
                title: "Pdentification",
                create: "varchar(16) NOT NULL",
                list: true
              },
              "parent": {
                type: "text",
                title: "Echantillon parent",
                create: "varchar(16) NULL",
                list: false
              },
              "libre": {
                type: "text",
                title: "Texte libre",
                create: "varchar(50) NULL",
                list: false
              },
              "prelevement": {
                type: "date",
                title: "Date de prélévement",
                create: "date NOT NULL",
                list: false
              },
              "peremption": {
                type: "date",
                title: "Date de péremption",
                create: "date NOT NULL",
                list: false
              },
              "pays": {
                type: "text",
                title: "Pays",
                create: "varchar(25) NOT NULL",
                list: false
              },
              "region": {
                type: "text",
                title: "Région",
                create: "varchar(30) NOT NULL",
                list: false
              },
              "pointx": {
                type: "text",
                title: "Point X",
                create: "varchar(15) NOT NULL",
                list: false
              },
              "pointy": {
                type: "text",
                title: "Point Y",
                create: "varchar(15) NOT NULL",
                list: false
              },
              "passeport": {
                type: "number",
                title: "tPasseport",
                create: "int2 NULL", 
                list: false
              },
              "cultures": {
                type: "json",
                title: "Historique cultural",
                create: "jsonb NULL",
                list: false
              },
              "stockage": {
                type: "json",
                title: "Informations de stockage",
                create: "jsonb NULL",
                list: false
              },
              "etiquette": {
                type: "json",
                title: "Paramètres étiquettes",
                create: "jsonb NULL",
                list: false
              },
              "etat": {
                type: "text",
                title: "Etat du prélévement",
                create: "varchar(10) NOT NULL", 
                list: true
              },
          },
              
        "constraints" : ["CONSTRAINT echantillons_pkey UNIQUE NULLS NOT DISTINCT (type, identification)"]
    },   
    "rpg" : {
      "columns": {
        "code": {
          type: "text" ,
          title: "Code",
          create: "varchar(4) UNIQUE NOT NULL",
          list : false
        },
        "valeur": {
            type: "text",
            title: "Valeur",
            create: "varchar(150) NOT NULL",
            list: false
        },
      },              
      "constraints" : []
    },
    "departement" : {
      "columns": {
        "code": {
          type: "text" ,
          title: "Code",
          create: "varchar(3) UNIQUE NOT NULL",
          list : false
        },
        "valeur": {
            type: "text",
            title: "Valeur",
            create: "varchar(50) NOT NULL",
            list: false
        },
      },              
      "constraints" : []
    },
    "sites" : {
      "columns": {
            "id": index,
            "nom": {
              type: "text" ,
              title: "Nom du site",
              create: "varchar(25) NOT NULL",
              list : true
            },
              "pays": {
                type: "text",
                title: "Pays",
                create: "varchar(25) NOT NULL",
                list: true
              },
              "region": {
                type: "text",
                title: "Région",
                create: "varchar(30) NOT NULL",
                list: true
              },
              "pointx": {
                type: "text",
                title: "Position X",
                create: "varchar(15) NOT NULL",
                list: true
              },
              "pointy": {
                type: "text",
				        title: "Position Y",
                create: "varchar(15) NOT NULL",
                list: true
              },
          },
              
        "constraints" : ["CONSTRAINT sites_pkey PRIMARY KEY (id)"]
    },    
    "excels" : {
      "columns": {
            "id": index,
            "datas": {
              type: "json",
              title: "Datas",
              create: "jsonb NOT NULL",
              list : false
            },
          },
              
        "constraints" : []
    },    
    "selections" : {
      "columns": {
            "id": index,
            "ids": {
              type: "numbers[]",
              title: "List od ids",
              create: "integer[]",
              list : false
            },
          },
              
        "constraints" : []
    },    
    "fichiers" : {
      "columns": {
            "id": index,
            "nom": {
              type: "text",
              title: "Nom du fichier",
              create: "character VARYING(1024)",
              list : false                
            },
            "fichier": {
              type: "byte",
              title: "Fichier",
              create: "BYTEA",
              list : false                
            }
          },
              
        "constraints" : []
    }
  }








