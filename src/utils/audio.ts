// Audio disabled per user specification
let soundEnabled = false;

export const setSoundEnabled = (_enabled: boolean) => {
  soundEnabled = false;
};

export const isSoundEnabled = () => false;

export const playSound = (_type?: 'click' | 'toggle' | 'success' | 'hover' | 'pop') => {
  // Silent - all sounds disabled per user request
};
