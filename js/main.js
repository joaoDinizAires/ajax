document.addEventListener("DOMContentLoaded",(e)=>{
    //username recebido por uma rota GET
    let profile = "laravel";

    const url = `https://api.github.com/users/${profile}`;

    //htmlDOM Colection
    const [avatarImg,profileName,profileUsername,repositoriesNum,followersNum,followingNum,profileLink] = document.querySelectorAll('header .profile-avatar, header .profile-name, header .profile-username, header #numbers-item-rep, header #numbers-item-followers, header #numbers-item-following, header .profile-link');
    //consumindo API github users
    async function getProfileData(url=''){
        const rawResponse = await fetch(url,{
            "method": "GET",
            "headers":{
                "Content-Type": "application/json"
            }
        }
        )
        return rawResponse.json();
    }
    // setando informações do perfil na view
    async function setProfileDataDOM(){
        const profileData = await getProfileData(url)
            .catch((e)=>{
                console.error('Error:'+ e);
            })
        avatarImg.src = profileData["avatar_url"];
        profileName.textContent = profileData["name"];
        profileUsername.textContent = profileData["login"];
        repositoriesNum.textContent = profileData["public_repos"];
        followersNum.textContent = profileData["followers"];
        followingNum.textContent = profileData["following"];
        profileLink.href = profileData["html_url"];
    }

    setProfileDataDOM();
})