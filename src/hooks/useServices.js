import CONFIG from '../config/config';
import axios from 'axios';
import Storage from './Storage';

const useServices = () => {
  const user = JSON.parse(sessionStorage?.getItem('USER'));

  const getActiveServices = async (setOpen, setServices, setIsLoading) => {
    setOpen(true);
    let config = {
      headers: {
        Authorization: `bearer ${JSON.parse(sessionStorage.getItem('TOKEN'))}`,
      },
    };
    let data = {
      '': '',
    };

    try {
      let apiService = '/asg-api/dbo/active_services/get_active_services';
      let response = await axios.post(
        `${CONFIG.server.piramideHostname}${apiService}`,
        data,
        config
      );
      setServices(response.data.result);
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      return error;
      setOpen(false);
    }
  };

  // Returning methods and properties
  return {
    getActiveServices,
  };
};

export default useServices;
