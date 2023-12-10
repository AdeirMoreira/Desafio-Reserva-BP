class UserContext {
    private static instance: UserContext;
    private userId: number | null = null;
  
    private constructor() {}
  
    public static getInstance(): UserContext {
      if (!UserContext.instance) {
        UserContext.instance = new UserContext();
      }
      return UserContext.instance;
    }
  
    public setUserId(userId: number): void {
      this.userId = userId;
    }
  
    public getUserId(): number | null {
      return this.userId;
    }
  }
  
  export default UserContext;