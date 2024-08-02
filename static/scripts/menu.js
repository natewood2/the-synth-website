document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(button => {
    button.addEventListener('click', function () {
      const dropdownContent = this.nextElementSibling;

      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        dropdownContent.classList.add('hide');
      } else {
        dropdownContent.classList.add('show');
        dropdownContent.classList.remove('hide');
      }
    });
  });
});
