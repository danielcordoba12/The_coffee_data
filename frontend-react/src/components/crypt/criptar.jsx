import CryptoJS from 'crypto-js';

const EncryptionComponent = ({ user_password, setPassword }) => {
  const encryptPassword = (plainPassword) => {
    const encryptedPassword = CryptoJS.AES.encrypt(plainPassword, 'secretkey123').toString();
    setPassword(encryptedPassword);
  };

  return null; // Este componente no renderiza nada visualmente
};

export default EncryptionComponent;
