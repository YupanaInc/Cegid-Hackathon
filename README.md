Sweepdoc

Catégorise vos emails et traite vos pièces.

"La boite à chaussure" historique des dirigenats de TPE a progressivement migré dans leur boite email.
La digitalisation systématique des échnages entre les clients et les fournisseurs en est la conséquence.   

Malgrès cela les entrepreneurs ne prennent pas le temps de communiquer les documents qu'ils recoivent régulièrement dans leurs boite email à leurs Expert-comptable.

Sweepdoc va le faire à leur place !

Simplement en autorisatant Sweepdoc à accéder à sa boite email, le chef d'entreprise vera chaque jour ses emails catégorisés par nature.
Périodiquement l'utilisateur recevra un email récapitulatif des pièces par catégories à mettre à disposition de son expert-comptable.
Un simple click lui permettra de le faire.

Dès qu'un email arrive ou part de la boite de l'utilisateur il est pris en charge par le service Sweepdoc qui le catégorise en fonction de l'émetteur, du sujet, du corps et des attachements.

Si l'email est significatif un flag est affecté à l'email en fonction de la catégorie : achat, vente, contrat, échéanciers, feuille de maladie ...

Une chaine de traitement spécifique est utilisée pour chaque nature de document.

Par exemple pour les achats, Sweepdoc est branché sur le service de Cegid qui collecte les transactions bancaires (ex Bankin).
A chaque réception d'une transaction bancaire le service de matching de Sweepdoc se déclenche et recherche un email correpondant à la transaction.
En cas de matching la catégorie "passé en banque" est affectée à l'email.

A la fin de la période un email récapitulatif des transactions est envoyé à l'utilisateur.
Les pièces à traiter sont présentées pour validiation dans une AdaptiveCard incluse au sein de l'email de récapiltulatif.

Dans le cas de la catégorie "achat" le service adresse les pièces à PIA qui génère les écritures dans la comptabilité du dossier.
L'email est catégorisé en retour par le service comme "comptabilisé".

Sweepdoc dépend uniquement des catégories affectées aux emails.
Ainsi l'utilisateur peut à tout moment ajouter ou supprimer un tag sur un email pour l'inclure ou l'exclure du processus de traitement.

L'architecture de Sweepdoc est totalement modulaire et "scalable" elle s'appuie uniquement sur des micro-services.
A chaque catégorie correspond un micro-service particulier.
Ceci permet de déployer des catégories au fil de l'eau ayant chacune un service spécifique associé pour effectuer les traitements.

Emboarding
La souscription au service Sweepdoc est extrèmenent facile.
Un simple click sur un lien suffit pour associer le dossier comptable et la boite email de l'utilisateur.
Une page de "consent utilisateur" est présentée pour donner les droits d'accès aux emails.

Out of scope
PIA extractor
PIA generator






