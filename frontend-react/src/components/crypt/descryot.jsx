import CryptoJS from 'crypto-js';

const DecryptionComponent = ({ encryptedPassword }) => {
  const decryptPassword = (encryptedPassword) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secretkey123');
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedPassword;
    } catch (error) {
      console.error('Error al desencriptar la contraseña:', error);
      return null;
    }
  };
}

export default DecryptionComponent;

