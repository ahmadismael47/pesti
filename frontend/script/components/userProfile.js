import { rendNavbar } from "./navbar.js";

rendNavbar();
let user = [];
const checkUser = async () => {
  const getUser = document.querySelector(".getUser");
  const getUserImg = document.querySelector(".right");
  try {
    const { data } = await axios.get("/profile");
    user = data;
    console.log(user.user.name);
    getUser.innerHTML = `
    <div>
            <label>First Name</label>
            <input type="text" disabled placeholder="${user.user.given_name}" />
    </div>
    <div>
            <label>Last Name</label>
            <input type="text" disabled placeholder="${user.user.family_name}" />
    </div>
    <div>
            <label>Email</label>
            <input type="Email" disabled placeholder="${user.user.email}" />
    </div>
    <div>
            <label>Updated at</label>
            <input type="text" disabled placeholder="${user.user.updated_at}" />
    </div>
    
    `;

    getUserImg.innerHTML = `
    <img src="${user.user.picture}" style="border-radius:50%" />
    <h2>@${user.user.nickname}<i class="fa-solid fa-check"></i> </h2>
    `;
  } catch (error) {}
};
checkUser();
