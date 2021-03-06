document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
  // Check if there are any navbar burgers
  if (navbarBurgers.length > 0) {

    // Add a click event on each of them
    navbarBurgers.forEach( burger => {

      burger.addEventListener('click', () => {

        // Get the target from the HTML "data-target" attribute 
        const menuItemsId = burger.dataset.target;
        const burgerDropdownItems = document.getElementById(menuItemsId);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        burger.classList.toggle('is-active');
        burgerDropdownItems.classList.toggle('is-active');

      });

      const dropdownToClose = document.getElementById("menuOptions");
      const optionsToTriggerClose = document.querySelectorAll(".close-burger-onclick");

      for(let option of optionsToTriggerClose){
         option.addEventListener('click', () => {
          burger.classList.toggle('is-active');
          dropdownToClose.classList.toggle('is-active');
        });
      }
    });
  }

  let liftBoxes = document.querySelectorAll(".liftMe");
  for(let box of liftBoxes){
    box.addEventListener('mouseenter', () => {
      console.log("liftMeUp triggered");
      box.classList.toggle("liftMeUp");
    });
    box.addEventListener('mouseleave', () => {
      // console.log("liftMeUp triggered");
      box.classList.toggle("liftMeUp");
    });
  }

  //event listeners for notification messages
  let notifications = document.querySelectorAll('.notification .delete');
  for(let entry of notifications){
    let displayBox = entry.parentNode;

    entry.addEventListener("click", () => {
      displayBox.parentNode.removeChild(displayBox);
    });
  }
});