/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <i id="fabig" class="fab fa-instagram"></i>
      <a class="navbar-brand" href="#">Photogram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/upload">Upload</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('/', {
   template: `
    <div class="row">
      <div class="pic-column">
      <img src="static/uploads/landingimg.jpg" alt="landing page image">
      </div>
      <div class="login-column">
            <div class="login-heading-wrap">
              <i id="fabig" class="fab fa-instagram"></i>
              <i class="login-heading">Photogram</i>
             </div>
            <div class="intro"><p id="intro">Share photos of your favourite memories with friends,
                family and the world</p>
                </div>
        <div class="button-wrapper">
        <button class="register-button-h">Register</button>
        <button class="login-button-h">Login</button>
        <div>
      </div>
      
    </div>
    
    
        
   `,
   
    data: function() {
       return {}
    }
});

const uploadForm = Vue.component('upload-form',{
    template: ` 
    <div class="upload">
        
        <div v-if='messageFlag' >
        
            <div v-if="!errorFlag ">
                <div class="alert alert-success" >
                    <p>File Upload Successful</p>                
                </div>
            </div>
            
            
            <div v-else >
                <ul class="alert alert-danger">
                    <li v-for="error in errorss">
                        {{ error[0] }}<br>
                    </li>
                    <li v-for="error in errorss">
                        {{ error[1] }}
                    </li>
                </ul>
            </div>
            
        </div>
        <p class="register" >Register</p>
        <div class="form-wrapper">
                <div class="form-inline d-flex justify-content">
                <form id="uploadForm"  @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data">
                <label for="uname">Username</label>
                <br>
                <input v-model="uname" name="uname">
                <br>
                <label for="password">Password</label>
                <br>
                <input v-model="password" name="password">
                <br>
                <label for="fname">Firstname</label>
                <br>
                <input v-model="fname" name="fname">
                <br>
                <label for="lname">Lastname</label>
                <br>
                <input v-model="lname" name="lname">
                <br>
                <label for="uname">Email</label>
                <br>
                <input v-model="email" name="email">
                <br>
                <label for="uname">Location</label>
                <br>
                <input v-model="location" name="location">
    
                <label for="biography">Biography</label>
                <input class="bioinput" v-model="biography" name="biography">
                <p class="photolabel">Photo</p>
                    <input type="file" name="upload" id="upload"/>
                    <label for="upload" class="uploadlabel">Browse</label>
                <br>
                <br>
                    <button class="register-button" type="submit">Register</button>
                </form>
            </div>
        </div>
    </div>
    `,
    methods: {
    uploadPhoto: function(){
        
        let self = this;
        let uploadForm = document.getElementById('uploadForm');
        let form_data = new FormData(uploadForm);
        
        fetch("/api/upload", {
            method: 'POST',
            body: form_data,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            // display a success message
             self.messageFlag = true;

                if (jsonResponse.hasOwnProperty("errors")){
                    self.errorFlag=true;
                    self.errorss = jsonResponse.errors;
                }
                else if(jsonResponse.hasOwnProperty("message")){
                    self.errorFlag = false;
                    self.response = jsonResponse.message;
                    
                }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
       onFileSelected: function(){
            let self = this;
            let filenameArr = $("#photo")[0].value.split("\\");
            self.filename = filenameArr[filenameArr.length-1];
        }
    },
    data: function(){
        return {
            errorFlag: false,
            messageFlag: false,
            errorss: [],
            response:[],
            filename: ""
        };
    }
});

const login = Vue.component('login',{
    template: ` 
    <div class="upload">
        
        <div v-if='messageFlag' >
        
            <div v-if="!errorFlag ">
                <div class="alert alert-success" >
                    <p>File Upload Successful</p>                
                </div>
            </div>
            
            
            <div v-else >
                <ul class="alert alert-danger">
                    <li v-for="error in errorss">
                        {{ error[0] }}<br>
                    </li>
                    <li v-for="error in errorss">
                        {{ error[1] }}
                    </li>
                </ul>
            </div>
            
        </div>
        <p class="register" >Login</p>
        <div class="login-form-wrapper">
                <div class="form-inline d-flex justify-content">
                <form id="uploadForm"  @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data">
                <label for="uname">Username</label>
                <br>
                <input v-model="uname" name="uname">
                <br>
                <label class="password">Password</label>
                <br>
                <input name="password">
                <br>
                    <button class="login-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
    `,
    methods: {
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        { path: "/register", component: uploadForm },
         { path: "/login", component: login },
        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});


// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});