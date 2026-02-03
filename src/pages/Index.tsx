import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type Screen = 'main' | 'payment' | 'success' | 'routes' | 'history' | 'balance';

interface Trip {
  id: string;
  route: string;
  time: string;
  amount: number;
  date: string;
}

const routes = [
  { number: '1', name: 'Центр - Вокзал', type: 'bus' },
  { number: '5', name: 'Площадь - ТЦ Мега', type: 'bus' },
  { number: '12', name: 'Парк - Стадион', type: 'bus' },
  { number: '24', name: 'Университет - Больница', type: 'bus' },
  { number: '7', name: 'Центр - Аэропорт', type: 'trolleybus' },
  { number: '9', name: 'Вокзал - Рынок', type: 'trolleybus' },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>('main');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [balance, setBalance] = useState(250);
  const [trips, setTrips] = useState<Trip[]>([
    { id: '1', route: 'Автобус №1', time: '14:32', amount: 45, date: '03.02.2026' },
    { id: '2', route: 'Автобус №5', time: '09:15', amount: 45, date: '03.02.2026' },
    { id: '3', route: 'Троллейбус №7', time: '18:20', amount: 45, date: '02.02.2026' },
  ]);

  const handleNFCTouch = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newTrip: Trip = {
        id: Date.now().toString(),
        route: `${selectedRoute.type === 'bus' ? 'Автобус' : 'Троллейбус'} №${selectedRoute.number}`,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        amount: 45,
        date: new Date().toLocaleDateString('ru-RU'),
      };
      setTrips([newTrip, ...trips]);
      setBalance(balance - 45);
      setScreen('success');
      setIsScanning(false);
      setTimeout(() => {
        setScreen('main');
      }, 3000);
    }, 1500);
  };

  const handleTopUp = (amount: number) => {
    setBalance(balance + amount);
  };

  if (screen === 'success') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/20 to-transparent pointer-events-none" />
        
        <div className="text-center z-10 animate-scale-in">
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#0EA5E9] to-[#0284c7] rounded-full flex items-center justify-center shadow-2xl shadow-[#0EA5E9]/50">
              <Icon name="Check" size={64} className="text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-[#0EA5E9] rounded-full opacity-20 ripple" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">Оплачено!</h1>
          <p className="text-3xl text-[#0EA5E9] font-medium mb-2">45 ₽</p>
          <p className="text-xl text-gray-400 mb-2">Приятной поездки</p>
          <p className="text-lg text-gray-500">{selectedRoute.type === 'bus' ? 'Автобус' : 'Троллейбус'} №{selectedRoute.number}</p>
          <p className="text-sm text-gray-600 mt-4">Остаток: {balance} ₽</p>
        </div>

        <div className="absolute bottom-4 left-4 text-xs text-gray-600 z-10">
          by @bortexchannel
        </div>
      </div>
    );
  }

  if (screen === 'routes') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setScreen('main')}
              variant="ghost"
              className="text-white hover:text-[#0EA5E9]"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Выбор маршрута</h1>
            <div className="w-10" />
          </div>

          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-3 pr-4">
              {routes.map((route) => (
                <Button
                  key={route.number}
                  onClick={() => {
                    setSelectedRoute(route);
                    setScreen('payment');
                  }}
                  className="w-full h-auto p-5 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#0EA5E9] rounded-xl transition-all"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-16 h-16 bg-[#0EA5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={route.type === 'bus' ? 'Bus' : 'Cable'} size={32} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-2xl font-bold text-white mb-1">№{route.number}</p>
                      <p className="text-sm text-gray-400">{route.name}</p>
                    </div>
                    <Icon name="ChevronRight" size={24} className="text-gray-500" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="absolute bottom-4 left-4 text-xs text-gray-600 z-10">
          by @bortexchannel
        </div>
      </div>
    );
  }

  if (screen === 'history') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setScreen('main')}
              variant="ghost"
              className="text-white hover:text-[#0EA5E9]"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">История поездок</h1>
            <div className="w-10" />
          </div>

          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-3 pr-4">
              {trips.map((trip) => (
                <Card key={trip.id} className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0EA5E9]/20 rounded-lg flex items-center justify-center">
                        <Icon name="Bus" size={24} className="text-[#0EA5E9]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{trip.route}</p>
                        <p className="text-sm text-gray-500">{trip.date} • {trip.time}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-white">-{trip.amount} ₽</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="absolute bottom-4 left-4 text-xs text-gray-600 z-10">
          by @bortexchannel
        </div>
      </div>
    );
  }

  if (screen === 'balance') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={() => setScreen('main')}
              variant="ghost"
              className="text-white hover:text-[#0EA5E9]"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Баланс карты</h1>
            <div className="w-10" />
          </div>

          <div className="mb-8 p-8 bg-gradient-to-br from-[#0EA5E9] to-[#0284c7] rounded-3xl text-center shadow-2xl shadow-[#0EA5E9]/30">
            <p className="text-white/80 mb-2">Текущий баланс</p>
            <p className="text-6xl font-bold text-white mb-1">{balance} ₽</p>
            <p className="text-white/60 text-sm">Примерно {Math.floor(balance / 45)} поездок</p>
          </div>

          <h2 className="text-xl font-bold text-white mb-4">Пополнить баланс</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[100, 200, 500, 1000].map((amount) => (
              <Button
                key={amount}
                onClick={() => handleTopUp(amount)}
                className="h-24 bg-[#1a1a1a] hover:bg-[#2a2a2a] border-2 border-[#2a2a2a] hover:border-[#0EA5E9] rounded-2xl transition-all"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-white mb-1">+{amount}</p>
                  <p className="text-xs text-gray-500">рублей</p>
                </div>
              </Button>
            ))}
          </div>

          <Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-[#0EA5E9] mt-1" />
              <div>
                <p className="text-sm text-gray-400">
                  Средства зачисляются моментально. Пополнение доступно с любой банковской карты.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="absolute bottom-4 left-4 text-xs text-gray-600 z-10">
          by @bortexchannel
        </div>
      </div>
    );
  }

  if (screen === 'payment') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent pointer-events-none" />
        
        <Button
          onClick={() => setScreen('main')}
          variant="ghost"
          className="absolute top-6 left-6 text-white hover:text-[#0EA5E9] z-10"
        >
          <Icon name="ArrowLeft" size={24} />
        </Button>

        <div className="text-center z-10 w-full max-w-md">
          <div className="mb-8">
            <Icon name={selectedRoute.type === 'bus' ? 'Bus' : 'Cable'} size={48} className="text-[#0EA5E9] mx-auto mb-4" />
            <h1 className="text-xl font-medium text-gray-400 mb-1">{selectedRoute.type === 'bus' ? 'Автобус' : 'Троллейбус'} №{selectedRoute.number}</h1>
            <p className="text-sm text-gray-500 mb-4">{selectedRoute.name}</p>
            <p className="text-7xl font-bold text-white mb-1">45 ₽</p>
            <p className="text-sm text-gray-500">Остаток: {balance} ₽</p>
          </div>

          <div className="mb-8">
            <Button
              onClick={handleNFCTouch}
              disabled={isScanning}
              className={`w-full h-64 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-4 border-[#0EA5E9] rounded-3xl relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0EA5E9]/30 ${
                isScanning ? 'nfc-pulse' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {isScanning ? (
                  <>
                    <div className="w-24 h-24 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mb-6" />
                    <p className="text-2xl font-medium text-[#0EA5E9]">Обработка...</p>
                  </>
                ) : (
                  <>
                    <div className="w-32 h-32 mb-6 relative">
                      <Icon name="Radio" size={128} className="text-[#0EA5E9] absolute inset-0" />
                      <div className="absolute inset-0 bg-[#0EA5E9]/20 rounded-full blur-2xl" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">Приложите карту</p>
                    <p className="text-lg text-gray-400">или устройство с NFC</p>
                  </>
                )}
              </div>
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <Icon name="CreditCard" size={24} className="text-[#0EA5E9]" />
                <span className="text-white">Банковская карта</span>
              </div>
              <Icon name="Check" size={20} className="text-[#0EA5E9]" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <Icon name="Smartphone" size={24} className="text-[#0EA5E9]" />
                <span className="text-white">Смартфон (NFC)</span>
              </div>
              <Icon name="Check" size={20} className="text-[#0EA5E9]" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-xs text-gray-600 z-10">
          by @bortexchannel
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent pointer-events-none" />
      
      <div className="text-center z-10 w-full max-w-md mb-8">
        <Icon name="Bus" size={64} className="text-[#0EA5E9] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">Терминал оплаты</h1>
        <p className="text-lg text-gray-400">Городской транспорт</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md z-10">
        <Button
          onClick={() => setScreen('routes')}
          className="h-40 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] border-2 border-[#2a2a2a] hover:border-[#0EA5E9] rounded-2xl transition-all"
        >
          <div className="text-center">
            <Icon name="Bus" size={48} className="text-[#0EA5E9] mx-auto mb-3" />
            <p className="text-xl font-bold text-white">Маршруты</p>
          </div>
        </Button>

        <Button
          onClick={() => setScreen('balance')}
          className="h-40 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] border-2 border-[#2a2a2a] hover:border-[#0EA5E9] rounded-2xl transition-all"
        >
          <div className="text-center">
            <Icon name="Wallet" size={48} className="text-[#0EA5E9] mx-auto mb-3" />
            <p className="text-xl font-bold text-white mb-1">Баланс</p>
            <p className="text-sm text-gray-400">{balance} ₽</p>
          </div>
        </Button>

        <Button
          onClick={() => setScreen('history')}
          className="h-40 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] border-2 border-[#2a2a2a] hover:border-[#0EA5E9] rounded-2xl transition-all"
        >
          <div className="text-center">
            <Icon name="History" size={48} className="text-[#0EA5E9] mx-auto mb-3" />
            <p className="text-xl font-bold text-white">История</p>
          </div>
        </Button>

        <Button
          onClick={() => setScreen('payment')}
          className="h-40 bg-gradient-to-br from-[#0EA5E9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] rounded-2xl transition-all shadow-xl shadow-[#0EA5E9]/30"
        >
          <div className="text-center">
            <Icon name="CreditCard" size={48} className="text-white mx-auto mb-3" />
            <p className="text-xl font-bold text-white">Оплатить</p>
          </div>
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 text-xs text-gray-600 z-10">
        by @bortexchannel
      </div>
    </div>
  );
};

export default Index;
