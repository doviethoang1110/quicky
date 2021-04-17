export const closeAppBar = () => {
    document.querySelector(".backdrop").classList.remove("backdrop-visible");
    document.querySelector(".appnavbar-content").classList.remove("appnavbar-content-visible");
    document.querySelector("#appNavTab").childNodes.forEach(n => {
        n.firstChild.classList.remove("active")
    });
}