import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requestType: 'account'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/37261f4d-19f6-49da-a8f0-f658c2fe1915', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          request_type: formData.requestType
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        setFormData({ name: '', phone: '', email: '', requestType: 'account' });
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить заявку. Попробуйте позже.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Проблема с подключением. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-purple-100">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ЯрФинанс
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">О банке</a>
            <a href="#cards" className="text-gray-700 hover:text-purple-600 transition-colors">Карты</a>
            <a href="#credits" className="text-gray-700 hover:text-purple-600 transition-colors">Кредиты</a>
            <a href="#services" className="text-gray-700 hover:text-purple-600 transition-colors">Услуги</a>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Войти
          </Button>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              Для молодых и амбициозных
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Банк нового
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                поколения
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Открывай счета онлайн, получай кэшбэк до 10% и управляй финансами в одном приложении
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8">
                Открыть счёт
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-purple-300 hover:bg-purple-50">
                Подробнее
              </Button>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-purple-100 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white">
                  <div>
                    <p className="text-sm opacity-90">Баланс</p>
                    <p className="text-3xl font-bold">124 580 ₽</p>
                  </div>
                  <Icon name="CreditCard" size={48} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: 'TrendingUp', label: 'Кэшбэк', value: '+2 450 ₽' },
                    { icon: 'Zap', label: 'Бонусы', value: '1 240' },
                    { icon: 'Shield', label: 'Защита', value: '100%' },
                    { icon: 'Percent', label: 'На остаток', value: '8%' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <Icon name={item.icon} size={24} className="text-purple-600 mb-2" />
                      <p className="text-xs text-gray-600">{item.label}</p>
                      <p className="text-lg font-bold text-purple-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 mb-4">
              О банке
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы создали банк, который понимает потребности молодого поколения
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Smartphone',
                title: 'Полностью онлайн',
                description: 'Открытие счёта за 5 минут без посещения офиса',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: 'Gift',
                title: 'Щедрый кэшбэк',
                description: 'До 10% кэшбэка на любимые категории',
                gradient: 'from-pink-500 to-orange-500'
              },
              {
                icon: 'Lock',
                title: 'Безопасность',
                description: 'Многоуровневая защита и страхование вкладов',
                gradient: 'from-blue-500 to-purple-500'
              }
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}>
                    <Icon name={item.icon} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cards" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 mb-4">
              Карты
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выбери свою карту</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Start',
                gradient: 'from-purple-600 to-pink-600',
                cashback: '3%',
                price: 'Бесплатно',
                features: ['Кэшбэк 3%', 'Бесплатное обслуживание', 'Снятие в любых банкоматах']
              },
              {
                name: 'Premium',
                gradient: 'from-blue-600 to-purple-600',
                cashback: '7%',
                price: '299 ₽/мес',
                features: ['Кэшбэк 7%', 'Консьерж-сервис', 'VIP залы в аэропортах', 'Страхование покупок']
              },
              {
                name: 'Elite',
                gradient: 'from-pink-600 to-orange-600',
                cashback: '10%',
                price: '999 ₽/мес',
                features: ['Кэшбэк 10%', 'Персональный менеджер', 'Приоритетная поддержка', 'Unlimited возвраты']
              }
            ].map((card, i) => (
              <Card key={i} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className={`h-48 bg-gradient-to-br ${card.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  <div className="relative z-10">
                    <p className="text-sm opacity-90">ЯрФинанс</p>
                    <p className="text-3xl font-bold mt-2">{card.name}</p>
                    <div className="mt-4">
                      <Icon name="CreditCard" size={48} className="opacity-80" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-baseline gap-2">
                    <CardTitle className="text-4xl">{card.cashback}</CardTitle>
                    <span className="text-gray-600">кэшбэк</span>
                  </div>
                  <CardDescription className="text-lg font-semibold">{card.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {card.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 bg-gradient-to-r ${card.gradient}`}>
                    Оформить карту
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="credits" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 mb-4">
              Кредиты
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Кредиты на любые цели</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: 'ShoppingBag',
                title: 'Потребительский кредит',
                rate: 'от 8.9%',
                amount: 'до 3 млн ₽',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: 'Home',
                title: 'Ипотека',
                rate: 'от 6.5%',
                amount: 'до 30 млн ₽',
                gradient: 'from-blue-500 to-purple-500'
              },
              {
                icon: 'Car',
                title: 'Автокредит',
                rate: 'от 7.9%',
                amount: 'до 5 млн ₽',
                gradient: 'from-pink-500 to-orange-500'
              },
              {
                icon: 'Briefcase',
                title: 'Для бизнеса',
                rate: 'от 9.9%',
                amount: 'до 10 млн ₽',
                gradient: 'from-green-500 to-blue-500'
              }
            ].map((credit, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${credit.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={credit.icon} size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{credit.title}</CardTitle>
                      <div className="flex gap-4 text-sm">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {credit.rate} годовых
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {credit.amount}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 mb-4">
              Услуги
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Все банковские услуги</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'Wallet', title: 'Вклады', desc: 'До 12% годовых' },
              { icon: 'ArrowRightLeft', title: 'Переводы', desc: 'Без комиссии' },
              { icon: 'PiggyBank', title: 'Накопления', desc: 'Автосбережения' },
              { icon: 'TrendingUp', title: 'Инвестиции', desc: 'От 1000 ₽' },
              { icon: 'Globe', title: 'Валюта', desc: 'Выгодный курс' },
              { icon: 'Shield', title: 'Страхование', desc: 'Защита средств' },
              { icon: 'Smartphone', title: 'Приложение', desc: 'iOS и Android' },
              { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Всегда на связи' }
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                    <Icon name={service.icon} size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl md:text-4xl mb-2">Онлайн-заявка</CardTitle>
                <CardDescription className="text-base">
                  Заполните форму и мы свяжемся с вами в течение 15 минут
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs defaultValue="account" className="w-full" onValueChange={(v) => setFormData({...formData, requestType: v})}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="account">Открыть счёт</TabsTrigger>
                      <TabsTrigger value="credit">Получить кредит</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ваше имя</Label>
                        <Input
                          id="name"
                          placeholder="Иван Иванов"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="ivan@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="credit" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name-credit">Ваше имя</Label>
                        <Input
                          id="name-credit"
                          placeholder="Иван Иванов"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone-credit">Телефон</Label>
                        <Input
                          id="phone-credit"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-credit">Email</Label>
                        <Input
                          id="email-credit"
                          type="email"
                          placeholder="ivan@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6">
                    Отправить заявку
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon name="Sparkles" size={24} />
                </div>
                <span className="text-xl font-bold">ЯрФинанс</span>
              </div>
              <p className="text-gray-400">Банк нового поколения для молодых и амбициозных</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукты</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#cards" className="hover:text-white transition-colors">Карты</a></li>
                <li><a href="#credits" className="hover:text-white transition-colors">Кредиты</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Вклады</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Инвестиции</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">О банке</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Партнёры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пресс-центр</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (800) 555-35-35</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@yarfinance.ru</span>
                </li>
                <li className="flex items-center gap-2 mt-4">
                  <Icon name="Instagram" size={20} />
                  <Icon name="Twitter" size={20} />
                  <Icon name="Youtube" size={20} />
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 ЯрФинанс. Все права защищены. Лицензия ЦБ РФ № 1234</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;