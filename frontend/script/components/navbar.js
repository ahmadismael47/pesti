import { navLinks } from "../assets/dummyData.js";
/////////////////////////////////////////NAV LINKS
let users = [];
let user = [];
export let isLogin = false;
export const rendNavbar = () => {
  const linkContainer = document.querySelector(".navbar");
  const link = document.createElement("ul");
  const sidebar = document.querySelector(".hamburger");

  link.innerHTML = navLinks
    .map((item) => {
      const { name, path, icon, id } = item;
      return ` <li  class="${name}" >
                  <i class="${icon}"></i><a href="${path}">${name}
                  </a>

             </li>       
         
             `;
    })
    .join("");

  link.classList.add("links");
  linkContainer.append(link);

  const checkUser = async () => {
    try {
      const { data } = await axios.get("/profile");
      user = data;
      isLogin = true;
      console.log(user);
      const login = document.createElement("li");
      const logout = document.createElement("li");
      const profile = document.createElement("li");
      const addProducts = document.createElement("li");

      login.innerHTML = ` 
                          <a>
                          <img src=${user.user.picture} class="user-profile" style="border-radius:50%; width:5rem"/>
                          </a>
  
                        `;
      logout.innerHTML = ` 
                        <a>
                        <i class="fa-solid fa-user-minus"></i><a  class="logout" href="/logout">Logout
                        </a>

                      `;
      profile.innerHTML = `
                        <a>
                        <i class="fa-solid fa-address-card"></i><a href="/pages/userProfile.html">Account
                        </a>
                        `;
      document.querySelector(".Login").remove();

      if (user.user.email === "capstab2018@gmail.com") {
        addProducts.innerHTML = ` 
        <a>
        <i class="fa-solid fa-cart-plus"></i><a  class="logout" href="/pages/adminDashboard.html">Manage products
        </a>

      `;
        link.append(addProducts);
      }
      const userDropdown = document.createElement("div");
      const userDropdownContent = document.createElement("div");

      userDropdownContent.append(addProducts, profile, logout);
      userDropdown.append(login, userDropdownContent);
      // link.append(logout);
      // link.append(login);
      userDropdownContent.classList.add("userDropdownContent");
      userDropdown.classList.add("userDropdown");
      link.append(userDropdown);
    } catch (error) {
      console.log(error);
    }
  };

  checkUser();
  //////////SIDEBAR

  sidebar.addEventListener("click", function () {
    console.log("hamburger click");
    link.classList.toggle("active-side");
    link.classList.toggle("overlay");
  });
};
