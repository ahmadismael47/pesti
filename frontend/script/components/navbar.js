import { navLinks } from "../assets/dummyData.js"
/////////////////////////////////////////NAV LINKS
export const rendNavbar = () => {
  const linkContainer = document.querySelector(".navbar")
  const link = document.createElement("ul")
  const sidebar = document.querySelector(".hamburger")

  let user = []

  link.innerHTML = navLinks
    .map((item) => {
      const { name, path, icon, id } = item
      return ` <li  class="${name}" >
                  <i class="${icon}"></i><a href="${path}">${name}
                  </a>

             </li>       
         
             `
    })
    .join("")

  link.classList.add("links")
  linkContainer.append(link)

  const checkUser = async () => {
    try {
      const { data } = await axios.get("/profile")
      user = data
      console.log(user.user)
      const login = document.createElement("li")
      const logout = document.createElement("li")
      const addProducts = document.createElement("li")
      login.innerHTML = ` 
                          <a>
                          <img src=${user.user.picture} class="user-profile" style="border-radius:50%; width:5rem"/>
                          </a>
  
                        `
      logout.innerHTML = ` 
                        <a>
                        <i class="fa-solid fa-user-minus"></i><a  class="logout" href="/logout">Logout
                        </a>

                      `
      document.querySelector(".Login").remove()

      if (user.user.email === "capstab2018@gmail.com") {
        addProducts.innerHTML = ` 
        <a>
        <i class="fa-solid fa-cart-plus"></i><a  class="logout">Add products
        </a>

      `
        link.append(addProducts)
      }

      link.append(logout)
      link.append(login)
    } catch (error) {
      console.log(error)
    }
  }

  checkUser()
  //////////SIDEBAR

  sidebar.addEventListener("click", function () {
    console.log("hamburger click")
    link.classList.toggle("active-side")
    link.classList.toggle("overlay")
  })
}
