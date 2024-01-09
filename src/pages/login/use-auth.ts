export const useAuth = () => {
    const isAuthenticated = () => {
      const accessToken = localStorage.getItem("accessToken");
      return !!accessToken;
    };

    const login = () => {
        
    }
    return {
      commands: {
            isAuthenticated,
      },
    };
};
