import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  MapPin, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  MessageCircle, 
  FileText, 
  Plus, 
  Edit,
  Upload,
  Download,
  Settings,
  Home,
  Clock,
  CheckCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import './App.css'

interface ShoppingItem {
  id: string
  name: string
  category: string
  assignedTo: string
  completed: boolean
  price?: number
}

interface Activity {
  id: string
  title: string
  description: string
  date: string
  time: string
  proposedBy: string
  votes: { userId: string; vote: 'up' | 'down' }[]
  confirmed: boolean
}

interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  splitBetween: string[]
  date: string
  category: string
}

interface Member {
  id: string
  name: string
  avatar: string
  role: 'admin' | 'editor' | 'viewer'
  email: string
}

interface ChatMessage {
  id: string
  sender: string
  message: string
  timestamp: string
  type: 'text' | 'file'
  fileName?: string
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [newShoppingItem, setNewShoppingItem] = useState('')
  const [newActivity, setNewActivity] = useState({ title: '', description: '', date: '', time: '' })
  const [newExpense, setNewExpense] = useState({ description: '', amount: 0, category: '' })
  const [newMessage, setNewMessage] = useState('')

  const tripInfo = {
    name: "Escapada a Barcelona",
    location: "Barcelona, España",
    dates: "15-18 Marzo 2024",
    accommodation: "Casa Moderna en Gràcia",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=400&fit=crop"
  }

  const [members] = useState<Member[]>([
    { id: '1', name: 'Ana García', avatar: 'AG', role: 'admin', email: 'ana@email.com' },
    { id: '2', name: 'Carlos López', avatar: 'CL', role: 'editor', email: 'carlos@email.com' },
    { id: '3', name: 'María Ruiz', avatar: 'MR', role: 'editor', email: 'maria@email.com' },
    { id: '4', name: 'David Sánchez', avatar: 'DS', role: 'viewer', email: 'david@email.com' }
  ])

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: '1', name: 'Pan y bollería', category: 'Comida', assignedTo: 'Ana García', completed: true, price: 15 },
    { id: '2', name: 'Bebidas', category: 'Bebidas', assignedTo: 'Carlos López', completed: false, price: 25 },
    { id: '3', name: 'Productos de limpieza', category: 'Limpieza', assignedTo: 'María Ruiz', completed: false, price: 12 },
    { id: '4', name: 'Snacks', category: 'Comida', assignedTo: 'David Sánchez', completed: true, price: 18 }
  ])

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Visita a la Sagrada Familia',
      description: 'Tour guiado por la famosa basílica de Gaudí',
      date: '2024-03-16',
      time: '10:00',
      proposedBy: 'Ana García',
      votes: [
        { userId: '1', vote: 'up' },
        { userId: '2', vote: 'up' },
        { userId: '3', vote: 'up' }
      ],
      confirmed: true
    },
    {
      id: '2',
      title: 'Cena en el Barrio Gótico',
      description: 'Explorar restaurantes tradicionales',
      date: '2024-03-16',
      time: '20:00',
      proposedBy: 'Carlos López',
      votes: [
        { userId: '1', vote: 'up' },
        { userId: '2', vote: 'up' }
      ],
      confirmed: false
    }
  ])

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Alojamiento Airbnb',
      amount: 320,
      paidBy: 'Ana García',
      splitBetween: ['1', '2', '3', '4'],
      date: '2024-03-15',
      category: 'Alojamiento'
    },
    {
      id: '2',
      description: 'Cena primer día',
      amount: 85,
      paidBy: 'Carlos López',
      splitBetween: ['1', '2', '3', '4'],
      date: '2024-03-15',
      category: 'Comida'
    }
  ])

  const [chatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Ana García',
      message: '¡Ya tengo las entradas para la Sagrada Familia!',
      timestamp: '10:30',
      type: 'text'
    },
    {
      id: '2',
      sender: 'Carlos López',
      message: 'Perfecto! He subido el mapa del metro',
      timestamp: '10:35',
      type: 'file',
      fileName: 'mapa-metro-barcelona.pdf'
    }
  ])

  const [checklist, setChecklist] = useState([
    { id: '1', task: 'Confirmar check-in con el anfitrión', completed: true, assignedTo: 'Ana García' },
    { id: '2', task: 'Comprar tarjetas de transporte', completed: false, assignedTo: 'Carlos López' },
    { id: '3', task: 'Reservar mesa para la cena del sábado', completed: false, assignedTo: 'María Ruiz' }
  ])

  const addShoppingItem = () => {
    if (newShoppingItem.trim()) {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: newShoppingItem,
        category: 'General',
        assignedTo: 'Sin asignar',
        completed: false
      }
      setShoppingList([...shoppingList, newItem])
      setNewShoppingItem('')
    }
  }

  const toggleShoppingItem = (id: string) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const addActivity = () => {
    if (newActivity.title.trim()) {
      const activity: Activity = {
        id: Date.now().toString(),
        title: newActivity.title,
        description: newActivity.description,
        date: newActivity.date,
        time: newActivity.time,
        proposedBy: 'Usuario Actual',
        votes: [],
        confirmed: false
      }
      setActivities([...activities, activity])
      setNewActivity({ title: '', description: '', date: '', time: '' })
    }
  }

  const voteActivity = (activityId: string, vote: 'up' | 'down') => {
    setActivities(activities.map(activity => {
      if (activity.id === activityId) {
        const existingVoteIndex = activity.votes.findIndex(v => v.userId === '1')
        const newVotes = [...activity.votes]
        
        if (existingVoteIndex >= 0) {
          newVotes[existingVoteIndex] = { userId: '1', vote }
        } else {
          newVotes.push({ userId: '1', vote })
        }
        
        return { ...activity, votes: newVotes }
      }
      return activity
    }))
  }

  const addExpense = () => {
    if (newExpense.description.trim() && newExpense.amount > 0) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: newExpense.amount,
        paidBy: 'Usuario Actual',
        splitBetween: ['1', '2', '3', '4'],
        date: new Date().toISOString().split('T')[0],
        category: newExpense.category || 'General'
      }
      setExpenses([...expenses, expense])
      setNewExpense({ description: '', amount: 0, category: '' })
    }
  }

  const calculateBalance = (memberId: string) => {
    const memberName = members.find(m => m.id === memberId)?.name || ''
    let balance = 0
    
    expenses.forEach(expense => {
      if (expense.paidBy === memberName) {
        balance += expense.amount
      }
      if (expense.splitBetween.includes(memberId)) {
        balance -= expense.amount / expense.splitBetween.length
      }
    })
    
    return balance
  }

  const toggleChecklistItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Home className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">StayReady</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member) => (
                  <Avatar key={member.id} className="border-2 border-white">
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                ))}
                {members.length > 3 && (
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full border-2 border-white text-xs font-medium text-gray-600">
                    +{members.length - 3}
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="shopping">Compras</TabsTrigger>
            <TabsTrigger value="activities">Actividades</TabsTrigger>
            <TabsTrigger value="expenses">Gastos</TabsTrigger>
            <TabsTrigger value="organization">Organización</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="members">Miembros</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{tripInfo.name}</span>
                  </CardTitle>
                  <CardDescription>{tripInfo.location} • {tripInfo.dates}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img 
                    src={tripInfo.image} 
                    alt={tripInfo.accommodation}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{tripInfo.accommodation}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{members.length} personas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>4 días</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Acceso rápido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('shopping')}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Lista de compras
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('activities')}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Planificar actividades
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('expenses')}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Gestionar gastos
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Resumen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Tareas pendientes</span>
                      <Badge variant="secondary">{checklist.filter(item => !item.completed).length}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Actividades confirmadas</span>
                      <Badge variant="secondary">{activities.filter(a => a.confirmed).length}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Gasto total</span>
                      <Badge variant="secondary">€{expenses.reduce((sum, exp) => sum + exp.amount, 0)}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Shopping List */}
          <TabsContent value="shopping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Lista de compras compartida</span>
                </CardTitle>
                <CardDescription>
                  Organiza las compras del viaje y asigna responsables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Añadir nuevo artículo..."
                    value={newShoppingItem}
                    onChange={(e) => setNewShoppingItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addShoppingItem()}
                  />
                  <Button onClick={addShoppingItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {shoppingList.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleShoppingItem(item.id)}
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.category} • {item.assignedTo}
                          {item.price && ` • €${item.price}`}
                        </div>
                      </div>
                      <Badge variant={item.completed ? 'default' : 'secondary'}>
                        {item.completed ? 'Comprado' : 'Pendiente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Planificador de actividades</span>
                </CardTitle>
                <CardDescription>
                  Propón planes, vota por ellos y confirma las actividades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Proponer actividad
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nueva actividad</DialogTitle>
                      <DialogDescription>
                        Propón una nueva actividad para el viaje
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={newActivity.title}
                          onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          value={newActivity.description}
                          onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Fecha</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newActivity.date}
                            onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Hora</Label>
                          <Input
                            id="time"
                            type="time"
                            value={newActivity.time}
                            onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button onClick={addActivity} className="w-full">
                        Proponer actividad
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="space-y-4">
                  {activities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{activity.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{activity.date}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{activity.time}</span>
                              </span>
                              <span>Por {activity.proposedBy}</span>
                            </div>
                          </div>
                          <Badge variant={activity.confirmed ? 'default' : 'secondary'}>
                            {activity.confirmed ? 'Confirmada' : 'Propuesta'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => voteActivity(activity.id, 'up')}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {activity.votes.filter(v => v.vote === 'up').length}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => voteActivity(activity.id, 'down')}
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              {activity.votes.filter(v => v.vote === 'down').length}
                            </Button>
                          </div>
                          {!activity.confirmed && activity.votes.filter(v => v.vote === 'up').length >= 2 && (
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirmar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Gestión de gastos</span>
                  </CardTitle>
                  <CardDescription>
                    Registra pagos y divide los costes entre los miembros
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Añadir gasto
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nuevo gasto</DialogTitle>
                        <DialogDescription>
                          Registra un nuevo gasto del viaje
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="expense-description">Descripción</Label>
                          <Input
                            id="expense-description"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="amount">Cantidad (€)</Label>
                          <Input
                            id="amount"
                            type="number"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Categoría</Label>
                          <Select onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Alojamiento">Alojamiento</SelectItem>
                              <SelectItem value="Comida">Comida</SelectItem>
                              <SelectItem value="Transporte">Transporte</SelectItem>
                              <SelectItem value="Actividades">Actividades</SelectItem>
                              <SelectItem value="General">General</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={addExpense} className="w-full">
                          Añadir gasto
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="space-y-3">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{expense.description}</div>
                          <div className="text-sm text-gray-500">
                            {expense.date} • {expense.category} • Pagado por {expense.paidBy}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">€{expense.amount}</div>
                          <div className="text-sm text-gray-500">
                            €{(expense.amount / expense.splitBetween.length).toFixed(2)} por persona
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Balances individuales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {members.map((member) => {
                    const balance = calculateBalance(member.id)
                    return (
                      <div key={member.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member.name}</span>
                        </div>
                        <Badge variant={balance > 0 ? 'default' : balance < 0 ? 'destructive' : 'secondary'}>
                          {balance > 0 ? '+' : ''}€{balance.toFixed(2)}
                        </Badge>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Organization */}
          <TabsContent value="organization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Llegadas y salidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        15 Mar 14:00 - 18 Mar 12:00
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Checklist del viaje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                      />
                      <div className="flex-1">
                        <div className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>
                          {item.task}
                        </div>
                        <div className="text-xs text-gray-400">{item.assignedTo}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Chat del grupo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 border rounded-lg p-4 overflow-y-auto space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">{message.sender}</span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          {message.type === 'text' ? (
                            <p className="text-sm">{message.message}</p>
                          ) : (
                            <div className="flex items-center space-x-2 text-sm text-blue-600">
                              <FileText className="h-4 w-4" />
                              <span>{message.fileName}</span>
                              <Download className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button>Enviar</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Archivos compartidos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir archivo
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">mapa-metro-barcelona.pdf</span>
                      </div>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">entradas-sagrada-familia.pdf</span>
                      </div>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Gestión de miembros</span>
                </CardTitle>
                <CardDescription>
                  Administra los participantes del viaje y sus permisos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invitar miembro
                </Button>

                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          member.role === 'admin' ? 'default' : 
                          member.role === 'editor' ? 'secondary' : 'outline'
                        }>
                          {member.role === 'admin' ? 'Administrador' : 
                           member.role === 'editor' ? 'Editor' : 'Solo lectura'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App
