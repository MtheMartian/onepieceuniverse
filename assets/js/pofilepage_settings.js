const userSettings = {
  areSettingsOpen: false,
}

document.getElementById('settings').addEventListener('click', () =>{
  const settingsButton = document.getElementById('settings');
  const settingsMenu = document.getElementById('pullover-menu');
  if(userSettings.areSettingsOpen == false){
    settingsMenu.classList.remove('hidden');
    userSettings.areSettingsOpen = true;
  }
  else{
    settingsMenu.classList.add('hidden');
    userSettings.areSettingsOpen = false;
  }
})