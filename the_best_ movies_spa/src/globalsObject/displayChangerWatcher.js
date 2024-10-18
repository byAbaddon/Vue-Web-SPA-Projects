// globals.js
import { ref, onMounted, onUnmounted } from 'vue'

const isSmallScreen = ref(false);
const mediaQuery = window.matchMedia('(max-width: 660px)')

const updateDisplay = () => {
  isSmallScreen.value = mediaQuery.matches
}

const useScreenWatcher = () => {
  onMounted(() => {
    updateDisplay()
    mediaQuery.addEventListener('change', updateDisplay);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updateDisplay);
  })

  return isSmallScreen
  
}

export default useScreenWatcher;

/*
//use in component
<p v-if="isSmallScreen"> Yes display is small</p>


import useScreenWatcher from '@/globalsObject/displayChangerWatcher.js'    !!! [.js] needed !!!
const isSmallScreen  = useScreenWatcher();
*/ 