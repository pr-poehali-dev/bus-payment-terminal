import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleNFCTouch = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsPaid(true);
      setTimeout(() => {
        setIsPaid(false);
        setIsScanning(false);
      }, 3000);
    }, 1500);
  };

  if (isPaid) {
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
          <p className="text-xl text-gray-400">Приятной поездки</p>
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
      
      <div className="text-center z-10 w-full max-w-md">
        <div className="mb-8">
          <Icon name="Bus" size={48} className="text-[#0EA5E9] mx-auto mb-4" />
          <h1 className="text-2xl font-medium text-gray-400 mb-2">Оплата проезда</h1>
          <p className="text-7xl font-bold text-white mb-1">45 ₽</p>
          <p className="text-sm text-gray-500">Безналичный расчет</p>
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
};

export default Index;
