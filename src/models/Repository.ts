class Repository {
    public id: number;
    public name: string;
    public url: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.url = data.html_url;
    }

    public toResponseObject(): any {
      return {
        id: this.id,
        name: this.name,
        url: this.url,
      };
    }
  }
  
  export default Repository;
  