export const formatServices = {
  truncateEmail: (email: string) => {
    {
      return (email ?? "").length > 15 ? email.slice(0, 15) + "..." : email;
    }
  },
};
