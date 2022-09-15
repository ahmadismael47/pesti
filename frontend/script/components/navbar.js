import { navLinks } from "../assets/dummyData.js"
/////////////////////////////////////////NAV LINKS
export const rendNavbar = () => {
  const linkContainer = document.querySelector(".navbar")
  const link = document.createElement("ul")
  const sidebar = document.querySelector(".hamburger")
  link.innerHTML = navLinks
    .map((item) => {
      const { name, path, icon, id } = item
      return ` <li><i class="${icon}"></i><a  class="${name}" href="${path}">${name}</a></li>`
    })
    .join("")

  link.classList.add("links")
  linkContainer.append(link)

  //////////SIDEBAR

  sidebar.addEventListener("click", function () {
    console.log("hamburger click")
    link.classList.toggle("active-side")
    link.classList.toggle("overlay")
  })
}
