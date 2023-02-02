const bodyParser = require('body-parser');
const exp = require('express');
const ejs = require('ejs');
const firebase = require("firebase-admin");
// const sassMiddleware = require('node-sass-middleware');
const app = exp();
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
var flash = require('connect-flash');
app.use(flash());

app.use(exp.static(__dirname + '/public'));
const users = [
    { id: 'Tony Katrib', email: 'tony.katrib@thewebaddicts.com', password: 'tonytony' },
    { id: 'The Web Addcits', email: 'admin@thewebaddicts.com', password: 'thewebaddicts123!@#' }

  ];

// app.use(
//     sassMiddleware({
//         src: __dirname + '/sass',
//         dest: __dirname + '/public/css',
//         debug: true
//     })
// );

// Implement the LocalStrategy for passport
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      const user = users.find(user => user.email === email);
      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    }
  ));
  // Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  app.get('/protected', isLoggedIn, function(req, res) {
    res.render('protected', { user: req.user });
  });
  // Middleware to check if user is logged in
const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
const firebaseConfig = {
    apiKey: "AIzaSyBkfTUp0m3NMJLj5dgiL_4SrwPEW8P3ZWI",
    authDomain: "testing-68b3a.firebaseapp.com",
    projectId: "testing-68b3a",
    storageBucket: "testing-68b3a.appspot.com",
    messagingSenderId: "231829222443",
    appId: "1:231829222443:web:b543a8e6e6e46b93c7e66e",
    measurementId: "G-54M3PKZEF2"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBv_PKu22pRe0HvbGiLdzVmNr5xj6l6vds",
//     authDomain: "live-love-recycle--dev.firebaseapp.com",
//     databaseURL: "https://live-love-recycle--dev-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "live-love-recycle--dev",
//     storageBucket: "live-love-recycle--dev.appspot.com",
//     messagingSenderId: "14517500091",
//     appId: "1:14517500091:web:9ab29e46f219046ffb119e",
//     measurementId: "G-46PKKWSH14"
//   };
const app_dataBase = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app_dataBase);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const entity_fields = {
    dev_users: [
        {name: "address", label: "Address", type: "textarea",grid:"ten"},
        {name: "createdAt", label: "Created At", type: "datepicker",grid:"ten"},
        {name: "fullName", label: "Full Name", type: "textfield",grid:"ten"},
        {name: "loyaltyPoints", label: "Loyalty Points", type: "textfield",grid:"ten"},
        {name: "mobile", label: "Mobile", type: "textfield",grid:"ten"},
        {name: "profileImage", label: "Profile Image", type: "textfield",grid:"ten"},
        {name: "updatedAt", label: "Updated At", type: "datepicker",grid:"ten"},
    ],
    dev_addressesToShowInApp: [
        {name: "country", label: "Country", type: "textfield",grid:"ten"},
         {name: "states", label: "States", type: "textarea",grid:"ten"},
        {name: "cities", label: "Cities", type: "textarea",grid:"ten"},
       
    ],
    dev_prices: [
        {name: "currency", label: "Currency", type: "textfield",grid:"ten"},
        {name: "imageUrl", label: "Image Url", type: "textfield",grid:"ten"},
        {name: "label", label: "Name", type: "textfield",grid:"ten"},
        {name: "price", label: "Price", type: "number",grid:"ten"},
    ],
    dev_categories: [
        {name: "label", label: "Name", type: "textfield",grid:"ten"},
        {name: "maxCapacity", label: "Max Capacity", type: "number",grid:"ten"},
        {name: "qAndADetails", label: "Question Details", class:"d-none", type: "jsonbuilder" ,grid:"sixteen", format : [
            {name: "qAndADetails[question]", label:"Questions", type: "textfield",grid:"ten"},
            {name: "qAndADetails[answers]", label: "Answers", type: "jsonbuilder" ,grid:"twelve" , format : [
                {name: "qAndADetails[answers][answer]", label:"Answer", type: "textfield",grid:"ten"},
            ]},
          
            ]
        },
        {name: "toContainerId", label: "Container ID", type: "textfield",grid:"ten"},
        {name: "quantityInfo", label: "Quantity Info",class:"d-none",  type: "jsonbuilder",grid:"sixteen" , format : [
            {name: "quantityInfo[subLabel]", label: "Sublabel", type: "textfield",grid:"eight"},
            {name: "quantityInfo[pointsPerUnitUnsorted]", label: "Points/unit (Unsorted)", type: "textfield",grid:"eight"},
            {name: "quantityInfo[label]", label: "Label", type: "textfield",grid:"eight"},
            {name: "quantityInfo[pointsPerUnitSorted]", label: "Points/unit (Sorted)", type: "textfield",grid:"eight"},
            {name: "quantityInfo[volumePerUnit]", label: "Volume/unit", type: "textfield",grid:"eight"},
            {name: "quantityInfo[unit]", label: "Unit", type: "textfield",grid:"eight"},
           
            ]
        },
    ],
    dev_parentCategories:[
        {name: "label", label: "Name", type: "textfield",grid:"ten"},
        {name: "maxCapacity", label: "Max Capacity", type: "number",grid:"ten"},
        {name: "toContainerId", label: "Container ID", type: "textfield",grid:"ten"},
        {name: "quantityInfo", label: "Quantity Info", class:"d-none", type: "jsonbuilder" ,grid:"sixteen" , format : [
            {name: "quantityInfo[subLabel]", label: "Sublabel", type: "textfield",grid:"eight"},
            {name: "quantityInfo[pointsPerUnitUnsorted]", label: "Points/unit (Unsorted)", type: "textfield",grid:"eight"},
            {name: "quantityInfo[label]", label: "Label", type: "textfield",grid:"eight"},
            {name: "quantityInfo[pointsPerUnitSorted]", label: "Points/unit (Sorted)", type: "textfield",grid:"eight"},
            {name: "quantityInfo[volumePerUnit]", label: "Volume/unit", type: "textfield",grid:"eight"},
            {name: "quantityInfo[unit]", label: "Unit", type: "textfield",grid:"eight"},
           
            ]
        },
       
    ],
    dev_paragraphs:[
        {name: "paragraphs", label: "Paragraphs", class:"d-none", type: "jsonbuilder",grid:"sixteen" , format : [
            {name: "paragraphs[title]", label: "Title", type: "textfield",grid:"ten"},
            {name: "paragraphs[body]", label: "Text", type: "textfield",grid:"ten"},
            ]},
    ],
    dev_bigContainersOfWarehouse:[
        {name: "containerLabel", label: "Label", type: "textfield",grid:"ten"},
        {name: "containerMaxCapacity", label: "Max Capacity", type: "number",grid:"ten"},
    ],
    dev_addresses:[
        {name: "building", label: "Building", type: "textfield",grid:"eight"},
        {name: "city", label: "City", type: "textfield",grid:"eight"},
        {name: "floor", label: "Floor", type: "textfield",grid:"eight"},
        {name: "lat", label: "Latitude", type: "textfield",grid:"eight"},
        {name: "lng", label: "Longitude", type: "textfield",grid:"eight"},
        {name: "nextTo", label: "Next To", type: "textfield",grid:"eight"},
        {name: "street", label: "Street", type: "textfield",grid:"eight"},


    ],
    dev_donationsAmmountsAndCurrency:[
        {name: "label", label: "Label", type: "textfield",grid:"ten"},
        {name: "values", label: "Values", class:"d-none",type: "jsonbuilder" ,grid:"ten", format : [
            {name: "values[value]", label: "Value", type: "textfield",grid:"eight"},
        
            ]},
    ],
    dev_drivers:[
        {name: "avatar", label: "Avatar", type: "textfield",grid:"ten"},
        {name: "country", label: "Country", type: "textfield",grid:"ten"},
        {name: "createdAt", label: "Created At", type: "datepicker",grid:"ten"},
        {name: "email", label: "Email Address", type: "email",grid:"ten"},
        {name: "firstName", label: "First Name", type: "textfield",grid:"ten"},
        {name: "gender", label: "Gender", type: "textfield",grid:"ten"},
        {name: "id", label: "ID", type: "textfield",grid:"ten"},
        {name: "lastName", label: "Last Name", type: "textfield",grid:"ten"},
        {name: "mobile", label: "Mobile Number", type: "textfield",grid:"ten"},
        {name: "name", label: "Full Name", type: "textfield",grid:"ten"},


    ],
    dev_driverOrders:[
        {name: "driverId", label: "Driver ID", type: "textfield",grid:"ten"},
        {name: "isSorted", label: "Sorted", type: "textfield",grid:"ten"},
        {name: "status", label: "Status", type: "email",grid:"ten"},
        {name: "userId", label: "Users ID", type: "date",grid:"ten"},
        {name: "items", label: "Items", class:"d-none",type: "textarea" ,grid:"ten"},
        
    ],
    dev_news:[
        {name: "title", label: "Title Of the Text", type: "textfield",grid:"ten"},
        {name: "body", label: "Body Text", type: "textarea",grid:"ten"},
        {name: "imageUrl", label: "Image URL", type: "textfield",grid:"ten"},
        {name: "createdAt", label: "Created At", type: "datepicker",grid:"ten"},
    ],
    dev_warehouseMangers:[
        {name: "accountType", label: "Account Type", type: "textfield",grid:"ten"},
        {name: "email", label: "Email", type: "email",grid:"ten"},
        {name: "isAccepted", label: "Accepted", type: "textfield",grid:"ten"},
        {name: "firstName", label: "First Name", type: "textfield",grid:"ten"},
        {name: "lastName", label: "Last Name", type: "textfield",grid:"ten"},
        {name: "mobile", label: "Mobile Number", type: "textfield",grid:"ten"},
        {name: "name", label: "Full Name", type: "textfield",grid:"ten"},
        {name: "id", label: "ID", type: "textfield",grid:"ten"},
        {name: "loggedInStatus", label: "Status", type: "textfield",grid:"ten"},
        {name: "qr", label: "QR", type: "textfield",grid:"ten"},
        {name: "systemVersion", label: "System Version", type: "textfield",grid:"ten"},
        {name: "loyaltyPoints", label: "Loyalty Points", type: "textfield",grid:"ten"},
        {name: "password", label: "Password", type: "password",grid:"ten"},
        {name: "warehouseId", label: "Warehouse ID", type: "textfield",grid:"ten"},
        {name: "gender", label: "Gender", class:"d-none", type:  "jsonbuilder",grid:"sixteen" , format : [
            {name: "gender[label]", label: "Label", type: "textfield",grid:"ten"},
            {name: "gender[value]", label: "Value", type: "textfield",grid:"ten"},
            ]},
        {name: "createdAt", label: "Created At", type: "datepicker",grid:"ten"},
        {name: "warehouseId", label: "Warehouse ID", type: "textfield",grid:"ten"},
    ],
    dev_warehouses:[
        {name: "addressDetails", label: "Addresse Details", class:"d-none", type: "jsonbuilder",grid:"sixteen", format : [
            {name: "addressDetails[building]", label: "Building", type: "textfield",grid:"eight"},
            {name: "addressDetails[city]", label: "City", type: "textfield",grid:"eight"},
            {name: "addressDetails[floor]", label: "Floor", type: "textfield",grid:"eight"},
            {name: "addressDetails[lat]", label: "Latitude", type: "textfield",grid:"eight"},
            {name: "addressDetails[lng]", label: "Longitude", type: "textfield",grid:"eight"},
            {name: "addressDetails[nextTo]", label: "Next To", type: "textfield",grid:"eight"},
            {name: "addressDetails[street]", label: "Street", type: "textfield",grid:"eight"},
            ]},
        {name: "availableStock", label: "Stock Availble", class:"d-none", type: "jsonbuilder",grid:"sixteen", format : [
            {name: "availableStock[detail]", label: "Details", class:"d-none", type: "jsonbuilder",grid:"twelve",format:[
                {name: "availableStock[detail][label]", label: "Label", type: "textfield",grid:"eight"},
                {name: "availableStock[detail][quantity]", label: "Quantity", type: "textfield",grid:"eight"},
                {name: "availableStock[detail][subLabel]", label: "Sub-Label", type: "textfield",grid:"eight"},
                {name: "availableStock[detail][unit]", label: "Unit", type: "textfield",grid:"eight"},
                {name: "availableStock[detail][volumePerUnit]", label: "Volume Per Unit", type: "textfield",grid:"eight"},
         ]},
            {name: "availableStock[label]", label: "City", type: "textfield",grid:"eight"},
            {name: "availableStock[maxCapacity]", label: "Floor", type: "textfield",grid:"eight"},
            {name: "availableStock[toContainerId]", label: "Latitude", type: "textfield",grid:"eight"},
        
            ]},
        
        {name: "listOfEmployees", label: "List Of Employees", class:"d-none", type: "textarea",grid:"twelve"},
        {name: "listOfWarehouseLargeContainers", class:"d-none", label: "List of Warehouse Large Containers", type: "textarea",grid:"twelve"},
        {name: "workingHours", label: "Working Hours", class:"d-none", type: "textarea",grid:"twelve"},
        {name: "photos", label: "Photos", type: "textfield",grid:"ten"},

        {name: "height", label: "Height", type: "number",grid:"ten"},
        {name: "width", label: "width", type: "number",grid:"ten"},
        {name: "lenght", label: "Lenght",type: "number" ,grid:"ten"},
        {name: "points", label: "Points",type: "number" ,grid:"ten"},
        {name: "storageCapacity", label: "Storage Capacity",type: "number" ,grid:"ten"},
        {name: "storageUsed", label: "Storage Used",type: "number" ,grid:"ten"},
        {name: "createdAt", label: "Created At", type: "datepicker",grid:"ten"},
        {name: "updatedAt", label: "Updated At",type: "datepicker",grid:"ten" },
        
    ],

};
const predefined_menu = {
    dev_users : { label : "Users"},
    dev_addressesToShowInApp : { label : "App Addresses"},
    dev_prices : { label : "Prices"},
    dev_categories : { label : "Categories"},
    dev_parentCategories : { label : "Parent Categories"},
    dev_paragraphs : { label : "Paragraphs"},
    dev_addresses : { label : "Addresses"},
    dev_bigContainersOfWarehouse: { label : "Big Containers Warehouses"},
    dev_donationsAmmountsAndCurrency: { label : "Donations"},
    dev_drivers: { label : "Drivers"},
    dev_driverOrders: { label : "Drivers Orders"},
    dev_news: { label : "News"},
    dev_warehouseMangers: { label : "Warehouse Managers"},
    dev_warehouses: { label : "Warehouses"},
};

const  getMenu = async (firestore) => {
    const collections = await firestore.listCollections();
    var menu = [];
    collections.forEach(function(item){
        if(predefined_menu.hasOwnProperty(item.id)){
            menu.push({
                'entity' : item.id,
                ...predefined_menu[item.id]
            });
        }
    })

    return menu;
}

app.get('/', async (req, res) => {
    

    res.render('login', {title:'Login', layout: 'layouts/sidebar'});
});
app.get('/home',authenticate,  async (req, res) => {
     const username =req.session.passport.user;

    const entity = req.params.entity;
    const firestore = firebase.firestore();
    
    // var menu = [];
    // menu = await getMenu(firestore);

    res.render('home', {title:'ENTITY LISTS',entity : entity , user: req.user,username:username});
});
//login post
app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));
//logout
app.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You are logged out');
       
      });
      res.redirect('/');
  });
 
app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
      res.render('protected', { user: req.user });
    } else {
      res.redirect('/login');
    }
  });
//VIEW DATA IN SPECIFIC ENTITY
app.get('/:entity/list',authenticate,async  (req, res) => {
    const entity = req.params.entity;
    const firestore = firebase.firestore();
    // const collections = await firestore.listCollections();
 

    if (entity_fields[entity] === undefined) {
        res.status(404).send('Not found');
    }
    const data = req.body;
    db.collection(entity).get()

        .then(usersSnapshot => {
            const rows = usersSnapshot.docs.map(doc => {
                  var row =  doc.data();
                  row['id'] = doc.id;
                  return row;
            }
            );
            const columns = entity_fields[entity];

            res.render('render', {title:'ENTITY LISTS', rows: rows, columns: columns , entity : entity });
        })
        .catch(error => {
            res.status(500).send(error);
        });  
});

//VIEW OF ADDING NEW DATA IN SPECIFIQUE ENTITY
app.get('/:entity', authenticate,async (req, res) => {
   
    const entity = req.params.entity;
    const firestore = firebase.firestore();
    // var menu = [];
    // menu = await getMenu(firestore);
    if (entity_fields[entity] === undefined) {
        res.status(404).send('Not found');
    }
    res.render('create', {title:'ENTITY CREATE',fields: entity_fields[entity], generateFields });
});

//ADD NEW DATA IN SPECIFIC ENTITY
app.post('/:entity',authenticate, async (req, res) => {
    const entity = req.params.entity;
    if (entity_fields[entity] === undefined) {
        res.status(404).send('Not found');
    }
    var body = req.body;

 

    var data = {};

      entity_fields[entity].forEach(function(field){

        switch(field.type){
            case "jsonbuilder" : 
            var json_object = [];
            var tbadded = {};
            var entries = Object.entries(body[field.name]);
            if(entries.length > 0){
                var count = entries[0][1].length;
                var empty = 0;
                var fields_all = 0;
                for(var i=0 ; i< count ; i++){
                    tbadded = {};
                    empty = 0;
                    fields_all = 0;
                    for (const [key, value] of entries) {
                        tbadded = {...tbadded , [key] : value[i]};
                        fields_all++;
                        if(value[i] == ""){
                            empty++;
                        }
                    }
                    if(empty != fields_all){
                        json_object.push(tbadded);
                    }
                }
                data= {...data , [field.name] : json_object };
            }
            break;
            default:
                data= {...data , [field.name] : body[field.name] };
        }
    });
    try{
    const entityRow = db.collection(entity);
    const response = await entityRow.add(data);
        res.redirect('../'+ entity+'/list');
    } catch (error) {
        res.status(500).send(error);
    }
});

//DELETE DATA
app.get('/delete/:entity/:id',authenticate, async (req, res) => {
    const entity = req.params.entity;

    
    if (entity_fields[entity] === undefined) {
        res.status(404).send('Not found');
    }
    try {
        const response = await db.collection(entity).doc(req.params.id).delete();
        res.redirect('back');
        //res.redirect(entity+'/list');
    } catch (error) {
        res.status(500).send(error);
    }
})

//VIEW EDITING SPECIFIC ROW BY ENTITY
app.get('/:entity/:id',authenticate, async (req, res) => {
    const entity = req.params.entity;
    const firestore = firebase.firestore();
    // var menu = [];
    // menu = await getMenu(firestore);
    const id = req.params.id;
    if (entity_fields[entity] === undefined) {
        res.status(404).send('Not found');
    }
    try {
        let rows = [];
        const userRef = db.collection(entity).doc(id);
        const response = await userRef.get();
        let row = response.data();
        // if (row.values.hasOwnProperty(0)) {
            // console.log('tony');
        // }
        res.render('update', {title:'ENTITY UPDATE',rows:rows,row:row, fields: entity_fields[entity] , generateFields : generateFields});
    } catch (error) {
        res.status(404).send('Not found');
    }
});

function transformObject() {
    let result = [];
    for (const [key, array] of Object.entries(entity_fields)) {
        array.forEach(function(value){
            result.push({ ...value , entity: key  });
        })
    }
    return result;
}

function getFieldsToUpdate(fieldname) {
    let fields = transformObject();
    return fields.filter(function(field){
        return field.name == fieldname
    });
}


function generateField(field ,data ,disableLabels){
    var value = "";

    var fieldname = field.name;
    fieldname = extractFieldName(fieldname);


    if(data != null && data.hasOwnProperty(fieldname)){
            value = data[fieldname];
    }

    switch (field.type) {
        case 'textfield': 

            return      `<div class="input-row ${field.grid}">
                            ${ !disableLabels ? `<label>${field.label}</label>` : ''}
                            <input  type="text" name="${field.name}" value="${value}" placeholder="${field.label}"/>
                        </div>`;
        case 'password': 

            return      `<div class="input-row ${field.grid}">
                             ${ !disableLabels ? `<label>${field.label}</label>` : ''}
                            <input   type="password" name="${field.name}" value="${value}" placeholder="${field.label}"/>
                        </div>`;
        case 'email': 
            return      `<div class="input-row ${field.grid}">
                           ${ !disableLabels ? `<label>${field.label}</label>` : ''}
                            <input    type="email" name="${field.name}" value="${value}"/>
                        </div>`;
           
        case 'datepicker':
            return      `<div class="input-row ${field.grid}">
                             ${ !disableLabels ? `<label>${field.label}</label>` : ''}
                            <input     type="date" name="${field.name}" value="${value}"/>
                        </div>`;
        case 'textarea':
            return      `<div class="input-row ${field.grid}">
                             ${ !disableLabels ? `<label>${field.label}</label>` : ''}
                            <textarea    name="${field.name}" id="" cols="30" rows="10">${value}</textarea>
                        </div>`;

        case 'number':  
            return      `<div class="input-row ${field.grid}">
                            ${ !disableLabels ? `<label>${field.label}</label>` : ''}
                            <input    type="number" name="${field.name}" value="${value}"/>
                        </div>`;

        case 'jsonbuilder':  

    
        
        
            var res = '';
        if(Array.isArray(value)){
            value.forEach(function(item , index) {
                    // console.log(item);
                if(index == 0){
                    res += `<div class="jsonbuilder-row">${generateFields(field.format ,item ,false)} <div> <div class="label" > Action </div> <div class="delete" > X </div></div> </div>`;
                }else{
                    res += `<div class="jsonbuilder-row">${generateFields(field.format , item , true)} <div> <button type="buton" onclick="deleteRow(this)"> X </button> </div></div>`;
                }

            });
        }
        
        else{
            res +=  `<div class="jsonbuilder-row">${generateFields(field.format , null ,false)} <div> <div class="label" > Action </div> <div class="delete" > X  </div></div> </div>
            <div class="jsonbuilder-row">${generateFields(field.format , null , true)} <div> <button type="buton" onclick="deleteRow(this)"> X</button> </div></div>`;
        }

        
        return `
        <div class="input-row ${field.grid} "> 
        ${ !disableLabels ? `<div class="label"> ${field.label} </div> ` : ''}
        <div class="jsonbuilder-form">
        ${res}
    
        </div>


        <div> 
        <div class="hidden"> 
        <div class="jsonbuilder-row">${generateFields(field.format ,null ,true)} <div> <button type="buton" onclick="deleteRow(this)"> X </button> </div></div>
    </div>
        <button class="add-json" type="buton" onclick="addRow(this)"> + </button> </div>
        </div>`;
                 
            
        }
}

function generateFields(fields ,data , disableLabels){
 
  
    var result = '';
    fields.forEach(function(field) {
        result += generateField(field , data ,disableLabels);
    });

 
    return result;
}

function extractFieldName(str){
    var new_str = "";  
    for(var i=0; i<str.length;i++) {
        if (str[i] === "["){
            new_str = "";
        }else{
            new_str += str[i] != "]" ? str[i] : "";
        }
    }
    return new_str;
    }
    

// function generateLabels(fields){
//     var result = '';
//     fields.forEach(function(field) {
//         result += `<div class="label">${field.label}</div>`;
//     });

 
//     return result;
// }


//EDIT DATA
app.post('/:entity/:id', async (req, res) => {
    const entity = req.params.entity;
    const id = req.params.id;
    if (entity_fields[entity] === undefined) {
        res.status(404).send('Not found');
    }
    var body = req.body;
    var data = {};


    entity_fields[entity].forEach(function(field){

        switch(field.type){
            case "jsonbuilder" : 
            var json_object = [];
            var tbadded = {};
            var entries = Object.entries(body[field.name]);

            if(entries.length > 0){
                var count = entries[0][1].length;
                var empty = 0;
                var fields_all = 0;
                for(var i=0 ; i< count ; i++){
                    tbadded = {};
                    empty = 0;
                    fields_all = 0;
                    for (const [key, value] of entries) {
                        tbadded = {...tbadded , [key] : value[i]};
                        fields_all++;
                        if(value[i] == ""){
                            empty++;
                        }
                    }
                    if(empty != fields_all){
                        json_object.push(tbadded);
                    }
                }
                data= {...data , [field.name] : json_object };
            }

            break;
            default:
                data= {...data , [field.name] : body[field.name] };
        }
    });

    db.collection(entity).doc(id).update(data)
        .then(() => {
           
            res.redirect('../'+ entity+'/list');
        })
        .catch(error => {
            res.status(500).send(error);
        });
        let fieldsToUpdate = getFieldsToUpdate(entity+'Model'); 
        fieldsToUpdate.forEach(async (value) => {
           var query = await db.collection(value.entity).where(entity+'Id' ,'==', id).get();
          query.docs.map(async (doc) => {
            var obj = {...doc.data() , [entity+'Model'] : data };
            await db.collection(value.entity).doc(doc.id).update(obj);
          });
        })
});



module.exports = app;

//INITIALIZING PORT
const port = process.env.port || 3048
app.listen(port, () => {
    // console.log('success');
})





