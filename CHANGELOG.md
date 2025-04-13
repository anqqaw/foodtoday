# Changelog

## [1.3.0](https://github.com/mrako/foodtoday/compare/v1.2.0...v1.3.0) (2025-04-13)


### Features

* Added a new file for swiping in shopping list ([66cd399](https://github.com/mrako/foodtoday/commit/66cd399691a1546645f3f8fb719c00c313fd179e))
* Added a toggle completed method to backend ([e4ec3b2](https://github.com/mrako/foodtoday/commit/e4ec3b2569b4c713183d474bdd6f09e2f784b938))
* Added handleRemoveItem method ([0aabaa4](https://github.com/mrako/foodtoday/commit/0aabaa4b5345a2f1963a0f74b12be82132277aeb))
* Added handlers for swiping ([f4f2e9a](https://github.com/mrako/foodtoday/commit/f4f2e9a98266f127aae84c19b48c5343a7b8c51d))
* Added handleToggleItem to frontend ([062f993](https://github.com/mrako/foodtoday/commit/062f9930b24062ee99dda1c6e99da3b5605877e6))
* Added new migration ([8673a75](https://github.com/mrako/foodtoday/commit/8673a7536a2a749b94cdb60eaece8fd59e5faa8b))
* Added new migration for database fix ([b8588a5](https://github.com/mrako/foodtoday/commit/b8588a519e53b45354e334c40480893de8bf6693))
* Added toggle endpoint ([6d8dfe2](https://github.com/mrako/foodtoday/commit/6d8dfe2a64dce953d63fca607b9ce7f71c22b7c5))
* Added toggling method to connect backend and frontend ([7f9cf5b](https://github.com/mrako/foodtoday/commit/7f9cf5b69f6caf226f7d756ffb4fdf8969e97c65))


### Bug Fixes

* Backend adding to shoppinglist add items in order ([e8777b6](https://github.com/mrako/foodtoday/commit/e8777b6710df315e9cc28f3fbffd430bd3f88566))
* Fixed adding to shoppinglist one by one ([8acf625](https://github.com/mrako/foodtoday/commit/8acf625772a979cd0c4f32e7f71ad383eadb307a))
* Fixed addToShoppingList method ([da6841b](https://github.com/mrako/foodtoday/commit/da6841b17179d26a1a9437729817393af8e07825))
* Fixed api.tsx to use params ([140a1ce](https://github.com/mrako/foodtoday/commit/140a1ce5975ea971382995569e93afb5f5172c09))
* Fixed backend endpoint for delete ([f3a8414](https://github.com/mrako/foodtoday/commit/f3a841474e9901dac7e4de96d09257bed173ff0d))
* Fixed backend problem to delete desired item from frontend click ([dc9bbc4](https://github.com/mrako/foodtoday/commit/dc9bbc401e69d811f978a070de57b4bc14721ea7))
* Fixed backend to delete desired item ([b8f91ca](https://github.com/mrako/foodtoday/commit/b8f91ca4a9ef8a7bf8250806f8bb3a49346a437a))
* Fixed backend toggle method's id to ctx.params ([8c8c245](https://github.com/mrako/foodtoday/commit/8c8c245c78889019837174cb297e9889dbadb253))
* Fixed backend's body to query ([83eb2a5](https://github.com/mrako/foodtoday/commit/83eb2a5dac9908cb23aad93243d8116345ec1763))
* Fixed data getting passed to backend ([c97d0be](https://github.com/mrako/foodtoday/commit/c97d0be1399dde431103f7818ffd485c260b0739))
* Fixed error message and removed unnecessary console.log ([ab4f824](https://github.com/mrako/foodtoday/commit/ab4f8243b27b9f12409853775eda9eb58b6ac473))
* Fixed frontend to use : ([b0d44d2](https://github.com/mrako/foodtoday/commit/b0d44d2e12eaef964435cf25ea78f5e9b1ca47a8))
* Fixed frontendin updating list based on backend ([3369c9f](https://github.com/mrako/foodtoday/commit/3369c9f28a0df51194bb7af957379df326204726))
* Fixed id from body to params ([909423d](https://github.com/mrako/foodtoday/commit/909423de14178248c2054e864986959d62c3bca2))
* Fixed id to be an integer ([6af6468](https://github.com/mrako/foodtoday/commit/6af6468102db3980082989928375e5ae0399ce60))
* Fixed id to item ([da59b9f](https://github.com/mrako/foodtoday/commit/da59b9f481c2476a430d54d2ea631cbda7e5151a))
* Fixed id to item ([984e29c](https://github.com/mrako/foodtoday/commit/984e29c94e700978fb429a96c49851a67a51d3a1))
* Fixed it back ([71e35f4](https://github.com/mrako/foodtoday/commit/71e35f4511d03030359275206b5a10578798782f))
* Fixed model User calling to ShoppingListItem ([2c80382](https://github.com/mrako/foodtoday/commit/2c8038270a639c97b5d66f8b731d3bbe73dbf5dc))
* Fixed prisma shoppinglistitem ([1fe6a2b](https://github.com/mrako/foodtoday/commit/1fe6a2bd789dffedbca11888e151b044223390c0))
* Fixed problem with shoppinglist splittin , esim. ([709ca23](https://github.com/mrako/foodtoday/commit/709ca23db1f5dae31f536e5ef454a9f326d7917e))
* Fixed shoppingListItems to shoppingListItem ([9f92eb9](https://github.com/mrako/foodtoday/commit/9f92eb970733515e6dbb64cd4db36d77c289d871))
* Fixed toggle endpoint ([7566c91](https://github.com/mrako/foodtoday/commit/7566c91438339e07e6177421065074baebb4b46d))
* Fixed toggle method in frontend to send id using params ([a08d30c](https://github.com/mrako/foodtoday/commit/a08d30c0200d046d25814df18995b3673a7b23c7))
* Fixed toggle's route in backend ([ca8b539](https://github.com/mrako/foodtoday/commit/ca8b539cbe78f77cbc92d5e9fd49793348a22f11))
* Fixed toggling in backend ([01deb6d](https://github.com/mrako/foodtoday/commit/01deb6d96db38f74bce9ebd7b3be551bd8af1666))
* Id is integer now and added {} to id variable ([a5d633c](https://github.com/mrako/foodtoday/commit/a5d633c7486095a0c7089816f713662089469e1d))
* Removed local toggling in frontend ([bf26612](https://github.com/mrako/foodtoday/commit/bf266127c4d5acc26016da8e4b6c1d0e9de22dc9))
* Updated backend to send whole shoppinglist when toggle ([8e7eb9a](https://github.com/mrako/foodtoday/commit/8e7eb9adc002d7d0b1d788416cbd72f02a151767))
* Updated backend to use id and item to identify the shoppinglist item ([d8884d2](https://github.com/mrako/foodtoday/commit/d8884d259e61ab7274b5d2d8c8ced6855e6e78c7))
* Updated shoppinglist to match swiping ([987a6a4](https://github.com/mrako/foodtoday/commit/987a6a45b7580fdb6acdd342686ea535d8f8e22a))

## [1.2.0](https://github.com/mrako/foodtoday/compare/v1.1.0...v1.2.0) (2025-03-19)


### Features

* Add frontend tests to github actions ([e1c5d23](https://github.com/mrako/foodtoday/commit/e1c5d23645417867d407a8540ee7a107f4e04919))
* Add google id to docker build ([6802e81](https://github.com/mrako/foodtoday/commit/6802e812b02e4e77b62d4c3c5f9364dd81773205))
* Add playwright testing framework ([91fa863](https://github.com/mrako/foodtoday/commit/91fa86305767fe269062964ffb502bbb64543f17))
* Add pre-signed google authentication to frontend tests ([760ef45](https://github.com/mrako/foodtoday/commit/760ef45bd55ad6206763fe2eeb7e72ba7e20be5b))
* Add react-swipeable for swiping for new recipes ([807e707](https://github.com/mrako/foodtoday/commit/807e707efc912a6068f98cb4dc4c51b012db26cd))
* add scroll using react-swipeable ([925e545](https://github.com/mrako/foodtoday/commit/925e5452ac5dab8ec7c681d3805ce67d0fab1c63))
* Add swiping to get new recipes ([22b49bc](https://github.com/mrako/foodtoday/commit/22b49bce33c98daa7878c9a9d03e1fa31a88a25e))
* Added a convertShoppingList method to frontend ([b7a518e](https://github.com/mrako/foodtoday/commit/b7a518ee9a00e10fb2964077762b10f04d522d61))
* Added a helper to remove a single item from shoppinglist ([e0ecc86](https://github.com/mrako/foodtoday/commit/e0ecc868d03db0def74633fd643035b5463ee29b))
* Added a navigationbar to replace hamburgermenu ([98af21a](https://github.com/mrako/foodtoday/commit/98af21a3d6de5901e6af1a294d71cb1d6668bddf))
* Added a tabel for users shopping list ([c01e345](https://github.com/mrako/foodtoday/commit/c01e3450c21908d6c63d146a4471008e3ad09dfe))
* Added add to list button ([97a069d](https://github.com/mrako/foodtoday/commit/97a069dade0012e897874f83543fdbc7e3368e4d))
* Added addToShoppingList helper and a route for it ([fcb55b3](https://github.com/mrako/foodtoday/commit/fcb55b30241939c7eb6681332da5c2c16a7bb1bc))
* Added addToShoppingList method ([dab57c2](https://github.com/mrako/foodtoday/commit/dab57c2001a5c613e4983ebd7ca0a3f8845898b4))
* Added clarification to dinnerCard for time and serves ([00ab510](https://github.com/mrako/foodtoday/commit/00ab510954cfa804a3c13b49f30f8914ec712efc))
* Added clear method for shoppingList ([4ae07d8](https://github.com/mrako/foodtoday/commit/4ae07d89a755336f467099ec8567825fa59a4b2e))
* Added connection between frontend and backend addToShoppingList ([d6e5009](https://github.com/mrako/foodtoday/commit/d6e5009b74de9325edfc3ab67a89fceb22cc4961))
* Added convertShoppingList method ([a3812aa](https://github.com/mrako/foodtoday/commit/a3812aa2b7f6737537ac3b5eef792d2dea297374))
* Added convertShoppingList route to app.ts ([39191b9](https://github.com/mrako/foodtoday/commit/39191b9f43d5e4b507356837b514861fbbc5658d))
* Added handleRemove method ([deada6d](https://github.com/mrako/foodtoday/commit/deada6d59ade7dac7f841894c1291488cf7f3b49))
* Added helper to api.tsx to handle clearShoppingList ([743317a](https://github.com/mrako/foodtoday/commit/743317ac1017096a5dde30d32fef42d8afd5df91))
* Added method and route for deleting an item from users shopping list ([5b037b8](https://github.com/mrako/foodtoday/commit/5b037b8b0f12e6113ae75b476877cd5bc8467c9a))
* Added more dinners ([3c80bd9](https://github.com/mrako/foodtoday/commit/3c80bd99f11c9f453f9ecdcd71e1329bcf4c5479))
* Added more dinners ([21ae7d2](https://github.com/mrako/foodtoday/commit/21ae7d2caa337f41230ace3a2f8be6a01b20a776))
* Added new migartion shoppingList ([6a5da31](https://github.com/mrako/foodtoday/commit/6a5da31d890ef22e93e81e81fc45093a90530188))
* Added new migration ([660c82b](https://github.com/mrako/foodtoday/commit/660c82b37f209a9abf1fc7c1b8834645dcf3707e))
* Added new migration shoppingList ([78307ef](https://github.com/mrako/foodtoday/commit/78307efbc62ca91345d0e56afb5bfcb0d885c33f))
* Added routers for shoppinglist and adding to shoppinglist ([e3633c2](https://github.com/mrako/foodtoday/commit/e3633c2e3541e7529aee09919b69a4d175cedecb))
* Added scroll down feature ([891a495](https://github.com/mrako/foodtoday/commit/891a4957c2658472a8feb0759b62682c3d6f990e))
* added searchDinners helper ([48eb4fa](https://github.com/mrako/foodtoday/commit/48eb4fa77bfce174b361071f2142ae66007b00bb))
* Added shoppinglist file ([351d9bb](https://github.com/mrako/foodtoday/commit/351d9bb4646e14a48b8807ae1c0868c8f71fccbb))
* Installed react-swipeable ([9a54548](https://github.com/mrako/foodtoday/commit/9a54548ac9e684c412ed827d5b935a942e133372))
* Made a users.ts file which returns users shoppinglist ([8aae62e](https://github.com/mrako/foodtoday/commit/8aae62e08ce453216c4c3cccad1732891b2e1b80))
* Made fetchShoppingList and addToShoppingList methods ([39afbf0](https://github.com/mrako/foodtoday/commit/39afbf01a6db81297504871c6b0de6661467d513))
* Made new migration for shoppingList ([7d143ae](https://github.com/mrako/foodtoday/commit/7d143ae6afeb90aed7d377a3d9f5d06b0fc6d1a4))
* Updated DinnerList to work with searchbar ([5f2c21c](https://github.com/mrako/foodtoday/commit/5f2c21c8e7d44bbce584e4875185676fc7ade981))


### Bug Fixes

* Deleted search-dinners endpoint ([df537a3](https://github.com/mrako/foodtoday/commit/df537a309ca4d615b00a6910a953e1d142903540))
* Deleted search-dinners endpoint ([3a35a99](https://github.com/mrako/foodtoday/commit/3a35a99f4383073d1c8343decd2ec9435c567541))
* Deleted search-dinners endpoint ([cc67993](https://github.com/mrako/foodtoday/commit/cc6799393b9a48840b5d6f8b8b7f36b4b0a63b43))
* fixed 'No Dinner found' ([ef8c487](https://github.com/mrako/foodtoday/commit/ef8c4876e81e3ffde3a863489d82e8c4198a1341))
* Fixed addToShoppingList error not adding to shoppinglist ([d0a75d0](https://github.com/mrako/foodtoday/commit/d0a75d0da6799c4ead7a2c8cb7f8eb4f5b0866d1))
* Fixed backend getShoppingList method ([f31741d](https://github.com/mrako/foodtoday/commit/f31741d33cd3796bbcd6d765e43d5c22f1570807))
* Fixed backend users.ts shoppingListItems ([c59e454](https://github.com/mrako/foodtoday/commit/c59e454018e50bbb7b9d718b01058366f6e39d77))
* Fixed bottomnavbar blockin main view ([7c235a5](https://github.com/mrako/foodtoday/commit/7c235a5c787b637c7668271be42e3dd12f8fcef4))
* Fixed convertShoppingList endpoint ([2a22e8e](https://github.com/mrako/foodtoday/commit/2a22e8ec6125474fefa175c80e9f98d179d1deb2))
* Fixed ctx.body getting the users shoppinglist ([ef9f36d](https://github.com/mrako/foodtoday/commit/ef9f36d50e03562d77e3da635c1962e265e7d228))
* Fixed dinners.ts addToShoppingList method ([450a1fd](https://github.com/mrako/foodtoday/commit/450a1fd5be793c4dbae5be37bcabf0bd7fe8f8b7))
* Fixed handleRemove to delete only one item ([1ee3d41](https://github.com/mrako/foodtoday/commit/1ee3d415defa461a0f3bac50ab18ab97cfe240b8))
* Fixed image links ([b2d4bf6](https://github.com/mrako/foodtoday/commit/b2d4bf673e3571c0f8c74625526ac70b3e608303))
* fixed non-working image links ([0b6de14](https://github.com/mrako/foodtoday/commit/0b6de14c865cfe371303d7974ca11cc7c5594cca))
* Fixed privateRouter address for clearing shoppinglist ([2cbe4fd](https://github.com/mrako/foodtoday/commit/2cbe4fd2f5b5ecfbf17aa64d5d9a9189400bce7a))
* Fixed settings to shopping list ([6323cd3](https://github.com/mrako/foodtoday/commit/6323cd3b3d84a8e91530dbd98582396614c8dd0b))
* Fixed unnecessary line from getShoppingList ([90f0f00](https://github.com/mrako/foodtoday/commit/90f0f001eeeb0da9cb69ccfdf196146b8e7af0a0))
* Moved converting inside addToShoppingList method ([4e7c0e3](https://github.com/mrako/foodtoday/commit/4e7c0e3b8c412a9136b809be8fc01aac0a88d1f8))
* Remove google id from code ([a550066](https://github.com/mrako/foodtoday/commit/a5500665c82bb32706d485a1a471d7524267eda4))
* remove login from test flow until google login is dynamic ([0d1f4d4](https://github.com/mrako/foodtoday/commit/0d1f4d47b00ba830ee9b95d16f3cf2350595305f))
* Removed nav bar from login view ([e0da454](https://github.com/mrako/foodtoday/commit/e0da454fec79d20b9f4cd511555b1c6fc26cb034))
* Removed nav bar from login view ([230f97b](https://github.com/mrako/foodtoday/commit/230f97b646a75143fa73689da3e721946beb7e30))
* removed unnecessary get query parameter ([c08e57f](https://github.com/mrako/foodtoday/commit/c08e57f5fe4a8e3583b005ea75b6810c2a09038e))
* removed unnecessary get query parameter ([d4645d8](https://github.com/mrako/foodtoday/commit/d4645d8af13be2e3563dede7203d060bfb37d3f3))
* removed unnecessary get query parameter ([e9166b6](https://github.com/mrako/foodtoday/commit/e9166b66c82a0d40ac37fa5db703f03aa0217c14))
* Updated addToShoppingList method according to new schema prisma ([35a1006](https://github.com/mrako/foodtoday/commit/35a10061425ac7a65e9cb2f5b7eb71a9b143869b))
* Updated users.ts methods to go with new schema prisma ([efc3229](https://github.com/mrako/foodtoday/commit/efc32292ed69422cb2ac03150c13868c3a806f77))

## [1.1.0](https://github.com/mrako/foodtoday/compare/v1.0.1...v1.1.0) (2025-02-10)


### Features

* add automated deployment of the built containers ([d555520](https://github.com/mrako/foodtoday/commit/d555520daf7d14b82c340125a746aacd7f2a0128))
* Changed title name to foodtoday ([1f2b5bc](https://github.com/mrako/foodtoday/commit/1f2b5bca2565bef808da9e1a602228467b808b84))


### Bug Fixes

* fixed images ([1497ea1](https://github.com/mrako/foodtoday/commit/1497ea188091dd2d0e301fd114007a25baec416a))

## [1.0.1](https://github.com/mrako/foodtoday/compare/v1.0.0...v1.0.1) (2025-02-10)


### Bug Fixes

* Update endpoint name ([9e2a2db](https://github.com/mrako/foodtoday/commit/9e2a2db97fc86012fec2e8b6d0bf83912d07b89b))
* Update package names ([612891a](https://github.com/mrako/foodtoday/commit/612891a54f434972b487483cef7c136dffee3dbb))

## 1.0.0 (2025-02-05)


### Features

* add automated releases with release please ([341482c](https://github.com/mrako/foodtoday/commit/341482c9668f98241142aa212511ac5eb037a6c5))
* add fetching dinner ([db771ce](https://github.com/mrako/foodtoday/commit/db771cec31a7443a5e8059c40a603186fd691ede))
* add login view ([b399605](https://github.com/mrako/foodtoday/commit/b39960569f9fa3f063ecb63b2c5863038bff36bb))
* add necessary environment variables ([d969c83](https://github.com/mrako/foodtoday/commit/d969c835d33fad6e0b16dcbabe3a56b91073fc81))
* add showing dinner and fix ingredients type ([b060088](https://github.com/mrako/foodtoday/commit/b0600882d36eada5dace2aab6619b0d214431065))
* add tailwind css ([1380074](https://github.com/mrako/foodtoday/commit/1380074c3fd28a0591676fb2e0d667a9480dfa25))
* Added build and deploy for docker packages ([ae7e7c7](https://github.com/mrako/foodtoday/commit/ae7e7c74db90be35c039db0ea140e60cc49ad90f))
* added DinnerDeatils file and updated app.tsx for usage ([6af309e](https://github.com/mrako/foodtoday/commit/6af309ee927b82bf37140fd4ec55e71219e97255))
* added DinnerList to the hamburger menu ([8087e0b](https://github.com/mrako/foodtoday/commit/8087e0b2aa1c6b1336e909abd4538eb75937b93a))
* added DinnrMeUp button ([993a8e7](https://github.com/mrako/foodtoday/commit/993a8e7c59f81aefb8914dbf63bf4df1a7f05a94))
* Added dockerfile to frontend ([69ef7f5](https://github.com/mrako/foodtoday/commit/69ef7f57d139d9111b55ce44aeb822284b7b4289))
* Added frontend to docker compose ([2d7b94c](https://github.com/mrako/foodtoday/commit/2d7b94c14ae4c1a41f970cd7d85d229039873aec))
* added github actions for backend ([a775343](https://github.com/mrako/foodtoday/commit/a7753434b6dad94ac0e8c7779e366965720f4c2c))
* Added nginx and VITE_ENDPOINT ([d431e0e](https://github.com/mrako/foodtoday/commit/d431e0e0e62ab344c49eadbec281aeecb530bdc0))
* Added randomization from backend to frontend ([64d711d](https://github.com/mrako/foodtoday/commit/64d711d7dc31fc7e3f38da385b5c9612773c7196))
* Added randomization to backend ([e34425b](https://github.com/mrako/foodtoday/commit/e34425bdecd4b4d46430c6202ae98221c0a7d321))
* added tailwind to dinnerdetails ([1399ca0](https://github.com/mrako/foodtoday/commit/1399ca05b7303f16ddbf9760bdf4376342878c4c))
* Added VITE_ENDPOINT for usage ([a16bcfe](https://github.com/mrako/foodtoday/commit/a16bcfe9638fc8dae50ab036557ad4b6b311e101))
* fixed Dinner-List navigation to DinnerDetails ([dc4d48c](https://github.com/mrako/foodtoday/commit/dc4d48c0731316789d98ad2ab5793c3eb2ccc15b))
* recommendation cards ([4b9f770](https://github.com/mrako/foodtoday/commit/4b9f7701b9a0962194755114bff1e3dd4ddbd739))
* refactor actions to dinners ([d590144](https://github.com/mrako/foodtoday/commit/d590144a2ef0f91d7ad09b3026c7fd70592afefc))
* remove voting, add login and list of dinners ([e08ec1f](https://github.com/mrako/foodtoday/commit/e08ec1fd6d158f8ddef9841b8f863f6875904dc3))
* update readme ([ccceed8](https://github.com/mrako/foodtoday/commit/ccceed829fb16838dbba305334855c440124f965))
* updated button and updated next and prev buttons ([4874d35](https://github.com/mrako/foodtoday/commit/4874d35370dd3bbd7ca20a56a70489ed01ae7d8a))
* updated frontend to use vite ([2efa744](https://github.com/mrako/foodtoday/commit/2efa7444ba63d1e41dbcd4d2cf411b218afbbae6))
* updated github workflows for building frontend and backend packages ([ff56b97](https://github.com/mrako/foodtoday/commit/ff56b97cacbdb7964a6ce0865ea911917408e9cf))
* updated next and prev buttons ([63cc0d2](https://github.com/mrako/foodtoday/commit/63cc0d26edd13262d05bf0dc3dfe517e451594c3))
* use google web token instead ([85c8a55](https://github.com/mrako/foodtoday/commit/85c8a55bfd7ccb2d6be2bc97448626c167a7e2b6))
* whole screen image ([ab568da](https://github.com/mrako/foodtoday/commit/ab568da9990783c807ec81b892df7bbbeccc1156))


### Bug Fixes

* fix build and deploy ([68636e1](https://github.com/mrako/foodtoday/commit/68636e1e5e9926880fb4310dba8f925baca5140e))
* fix build and deploy ([4546e05](https://github.com/mrako/foodtoday/commit/4546e05ddba1e28a3d575a407c8c10487b1e993f))
* fix compose command ([2d18800](https://github.com/mrako/foodtoday/commit/2d18800d0a3d7584eec426831664c6e42e04bf00))
* fix database url, db to localhost ([92aaca6](https://github.com/mrako/foodtoday/commit/92aaca6a9a1109c51012bff439985dc9538551b9))
* fix github actions workflow indentation ([2d0d921](https://github.com/mrako/foodtoday/commit/2d0d9213b11edbbfaf37abc82d2904ea89fadd24))
* fix rate limit ([305ceab](https://github.com/mrako/foodtoday/commit/305ceabe75feeea675ef350606726759fa82eb90))
* fix workflow ([03b395c](https://github.com/mrako/foodtoday/commit/03b395ce9614c74128262af19eea9eb0ecf34d8c))
* remove webSocket from test ([0166805](https://github.com/mrako/foodtoday/commit/01668053c25da19b0455fd43631ff00e4f92f1f9))
* removed black background for picture ([e5ce4fc](https://github.com/mrako/foodtoday/commit/e5ce4fc52ed72f91b7fde6a1d812188672d1f191))
* test with permissions ([e8577f8](https://github.com/mrako/foodtoday/commit/e8577f80bb0f9500505f7e36a6c29cc2085b0407))
* update migrations to have dinner with numeric id and remove json stringify ([dbfa362](https://github.com/mrako/foodtoday/commit/dbfa362b0c011f047429292ae8ea994aa5eecdb9))
* updated getting :id as number ([93d46c7](https://github.com/mrako/foodtoday/commit/93d46c77eb2f976fa6185bbbfd3a8ecb364b8d4a))
