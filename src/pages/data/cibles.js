const cibles = [{
        'id': 0,
        'name': "Ensemble",
        'data': [{
            'id': 1,
            'name': 'Ensemble'
        }]
    },
    {
        'id': 1,
        'name': "Sexe",
        'data': [{
                'id': 1,
                'name': 'Homme'
            },
            {
                'id': 2,
                'name': 'Femme'
            }
        ]
    },
    {
        'id': 2,
        'name': "Niveau Scolaire",
        'data': [{
                'id': 1,
                'name': 'Diplome'
            },
            {
                'id': 2,
                'name': 'Non diplome'
            }
        ]
    },
    {
        'id': 3,
        'name': "Nombre d'Enfant",
        'data': [{
                'id': 1,
                'name': '0-3 Enfants'
            },
            {
                'id': 2,
                'name': '4-5 Enfants'
            },
            {
                'id': 3,
                'name': '6-10 Enfants'
            },
            {
                'id': 4,
                'name': 'plus de 10 Enfants'
            }
        ]
    },
    {
        'id': 4,
        'name': "Job",
        'data': [{
                'id': 1,
                'name': 'Personnel de Direction'
            },
            {
                'id': 2,
                'name': 'Cadre Moyen / Supérieur'
            },
            {
                'id': 3,
                'name': 'Agent de Maitrise'
            },
            {
                'id': 4,
                'name': 'Employé / Ouvrier'
            },
            {
                'id': 5,
                'name': 'Manoeuvre / Employé non qualifié'
            },
            {
                'id': 6,
                'name': 'Apprenti / Stagiaire remunéré'
            },
            {
                'id': 7,
                'name': 'Patron'
            },
            {
                'id': 8,
                'name': 'Propre compte(Profession libérale)'
            },
            {
                'id': 9,
                'name': 'Aide familiale'
            },
            {
                'id': 10,
                'name': 'Informel'
            },
            {
                'id': 11,
                'name': 'Chômeurs'
            },
            {
                'id': 12,
                'name': 'Etudiant, Elèves, Ecoliers, Stagiaire / Apprenti non remunéré'
            },
            {
                'id': 13,
                'name': 'Personne au foyer'
            },
            {
                'id': 14,
                'name': 'Retraités'
            },
            {
                'id': 15,
                'name': 'Autres'
            }
        ]
    },
    {
        'id': 5,
        'name': "Nombre de Moto",
        'data': [{
                'id': 1,
                'name': '0-3 Motos'
            },
            {
                'id': 2,
                'name': '4-5 Motos'
            },
            {
                'id': 3,
                'name': '6-10 Motos'
            },
            {
                'id': 4,
                'name': 'Plus de 10 Motos'
            }
        ]
    },
    {
        'id': 6,
        'name': "Nombre de Voiture",
        'data': [{
                'id': 1,
                'name': '0-3 Voitures'
            },
            {
                'id': 2,
                'name': '4-5 Voitures'
            },
            {
                'id': 3,
                'name': '6-10 Voitures'
            },
            {
                'id': 4,
                'name': 'Plus de 10 Voitures'
            }
        ]
    },
    {
        'id': 7,
        'name': "Nombre de TV",
        'data': [{
                'id': 1,
                'name': '0-3 TV'
            },
            {
                'id': 2,
                'name': '4-5 TV'
            },
            {
                'id': 3,
                'name': '6-10 TV'
            },
            {
                'id': 4,
                'name': 'Plus de 10 TV'
            }
        ]
    },
    {
        'id': 8,
        'name': "Revenu Mensuel",
        'data': [{
                'id': 1,
                'name': '30000-90000'
            },
            {
                'id': 2,
                'name': '90000-150000'
            },
            {
                'id': 3,
                'name': '150000-250000'
            },
            {
                'id': 4,
                'name': '250000-400000'
            },
            {
                'id': 5,
                'name': '400000 et plus'
            },
            {
                'id': 6,
                'name': 'NR'
            }
        ]
    },
    {
        'id': 9,
        'name': "Langues",
        'data': [{
                'id': 1,
                'name': 'Français'
            },
            {
                'id': 2,
                'name': 'Anglais'
            },
            {
                'id': 3,
                'name': 'Langues Maternelle'
            },
            {
                'id': 4,
                'name': 'Autre langue (à préciser)'
            },
            {
                'id': 5,
                'name': "(Pas d'autres langues)"
            }
        ]
    },
    {
        'id': 10,
        'name': "Abonnement",
        'data': [{
                'id': 1,
                'name': 'CanalSat'
            },
            {
                'id': 2,
                'name': 'CreoLink'
            },
            {
                'id': 3,
                'name': 'Cablo-Operateur'
            },
            {
                'id': 4,
                'name': 'TV+'
            },
            {
                'id': 5,
                'name': 'StarTimes'
            },
            {
                'id': 6,
                'name': 'Free Africa'
            },
            {
                'id': 7,
                'name': 'DSTV'
            },
            {
                'id': 8,
                'name': 'Autre abonnement (A Préciser)'
            }
        ]
    },
    {
        'id': 11,
        'name': "Age",
        'data': [{
                'id': 1,
                'name': "15-24 ans",
            },
            {
                'id': 2,
                'name': "25-34 ans",
            },
            {
                'id': 3,
                'name': "35-49 ans",
            },
            {
                'id': 4,
                'name': "50 ans et plus",
            }
        ]
    },
    {
        'id': 12,
        'name': "Cables",
        'data': [{
                'id': 1,
                'name': "Par l'antenne classique de votre poste de distribution (antenne intérieure fixée sur le poste TV)",
            },
            {
                'id': 2,
                'name': "Par une antenne parabolique/Parabole",
            },
            {
                'id': 3,
                'name': "Par un réseau de distribution de quartier (Câble tirés)",
            },
            {
                'id': 4,
                'name': "Autre type d'antenne (A préciser)",
            }
        ]
    },
    {
        'id': 13,
        'name': "HautDiplome",
        'data': [{
                'id': 2,
                'name': "Primaire (CP1 au CM2)",
            },
            {
                'id': 3,
                'name': "Secondaire 1er Cycle (6ème à 3ème)",
            },
            {
                'id': 4,
                'name': "Secondaire 2ème cycle (2nde à la Terminale",
            },
            {
                'id': 7,
                'name': "Enseignement Supérieur (BAC+)",
            },
            {
                'id': 9,
                'name': "Sans enseignement",
            },
            {
                'id': 99,
                'name': "NSP",
            }
        ]
    },
    {
        'id': 14,
        'name': "Status",
        'data': [{
                'id': 1,
                'name': 'Actif'
            },
            {
                'id': 2,
                'name': 'Inactif'
            }
        ]
    }
]

export default cibles