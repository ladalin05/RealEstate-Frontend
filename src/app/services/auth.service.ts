const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export class AuthService {

  static setToken(token: string | null) {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }

  static setUser(user: any) {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }

  static getUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static async getProfileData() {
      const token = this.getToken();

      if (!token) return null;

      const response = await fetch(`${API_URL}/user-management/get-info`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
          },
      });

      const result = await response.json();
      return result.data;
  }

  static async checkAuthUser() {
    const token = this.getToken();

    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/user-management/get-user`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            await this.logout();
            return null;
        }

        const result = await response.json();
        return result?.data?.user ?? null;

    } catch (error) {
        console.error("checkAuthUser failed:", error);
        await this.logout();
        return null;
    }
  }

  static async updateProfile(user_id: any, data: { fullname: string; phone: string }) {
    const token = this.getToken();
 
    if (!token) return null;
 
    const response = await fetch(`${API_URL}/users/${user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
 
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.message ?? `Failed to update profile (${response.status})`);
    }
 
    const result = await response.json();
    return result;
  }

  static async registerUser(userData: any) {
    const userDataRequest = {
      name: userData.firstName + " " + userData.lastName,
      username: (userData.firstName + userData.lastName).toLowerCase().replace(/\s/g, ""),
      email: userData.email,
      password: userData.password,
    }
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataRequest),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.message ?? "Registration failed");
    }

    const result = await response.json();

    this.setToken(result.data.token);
    this.setUser(result.data.user);

    return result;
  }

  static async loginUser(userData: any) { 
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
        throw new Error('Login failed. Please check your email and password.');
    }
    
    const result = await response.json();
    this.setToken(result.data.token);
    this.setUser(result.data.user);

    return result;
  }
  
  static async googleLogin(accessToken: string) {
    
    const response = await fetch(`${API_URL}/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });

    const result = await response.json();
    

    if (!response.ok) {
      throw new Error(result?.message ?? "Google login failed");
    }

    // store directly from login response
    this.setToken(result.data.token);
    this.setUser(result.data.user);
    
    return result;
  }

  static async UpdateInfo(userData: any) {
    try {
      const response = await fetch(`${API_URL}/user-management/update-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (error) {
      console.error("Error updating info:", error);
      throw error;
    }
  }

  static isAuthenticated() {
    return !!this.getToken() && !!this.getUser();
  }

  static async logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
      },
    });
    const result = await response.json();

    this.setToken(null);
    this.setUser(null);

    return result;
  }
}