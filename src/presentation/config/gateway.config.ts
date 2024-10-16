
interface GatewayConfig {
    name: string;
    url: string;
    apiKey: string; // Opcional
    timeout: number; // Timeout en milisegundos
  }
  
  const gateways: GatewayConfig[] = [
    {
      name: 'OpenWeatherMap',
      url: process.env.GATEWAY1_URL || 'https://api.openweathermap.org/data/2.5/weather',
      apiKey: process.env.GATEWAY1_API_KEY || 'fakepasss',
      timeout: Number(process.env.GATEWAY1_TIMEOUT) || 5000,
    },
    {
      name: 'WeatherApi',
      url: process.env.GATEWAY2_URL || 'http://api.weatherapi.com/v1',
      apiKey: process.env.GATEWAY2_API_KEY || 'fakepass',
      timeout: Number(process.env.GATEWAY2_TIMEOUT) || 3000,
    }
  ];
  
  export default gateways;
  