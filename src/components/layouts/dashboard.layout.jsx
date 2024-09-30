import { useState, useEffect, useCallback } from 'react'
import {
  Settings,
  Search,
  User,
  LogOut,
  Moon,
  Sun,
  Laptop,
  Menu,
  Inbox,
  File,
  Send,
  ArchiveX,
  Trash2,
  Archive,
  Users2,
  AlertCircle,
  MessageSquare,
  ShoppingCart,
  Tag
} from 'lucide-react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const cn = (...classes) => classes.filter(Boolean).join(' ')

const NavItem = ({ icon: Icon, label, count, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (isCollapsed) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full p-0 h-10 justify-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          className="px-2 py-1"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <p className="text-sm font-medium">{label}</p>
          {count !== undefined && <p className="text-xs text-muted-foreground">{count}</p>}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Button variant="ghost" className="w-full justify-start">
      <Icon className="h-4 w-4 mr-2" />
      <span>{label}</span>
      {count !== undefined && <span className="ml-auto text-muted-foreground">{count}</span>}
    </Button>
  )
}

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={cn('flex flex-col h-full', isCollapsed ? 'items-center' : 'items-start')}>
      <ScrollArea className="flex-grow w-full">
        <div className={cn('space-y-2', isCollapsed ? 'px-2' : 'p-2')}>
          <NavItem icon={Inbox} label="Inbox" count={128} isCollapsed={isCollapsed} />
          <NavItem icon={File} label="Drafts" count={9} isCollapsed={isCollapsed} />
          <NavItem icon={Send} label="Sent" isCollapsed={isCollapsed} />
          <NavItem icon={ArchiveX} label="Junk" count={23} isCollapsed={isCollapsed} />
          <NavItem icon={Trash2} label="Trash" isCollapsed={isCollapsed} />
          <NavItem icon={Archive} label="Archive" isCollapsed={isCollapsed} />
          <NavItem icon={Users2} label="Social" count={972} isCollapsed={isCollapsed} />
          <NavItem icon={AlertCircle} label="Updates" count={342} isCollapsed={isCollapsed} />
          <NavItem icon={MessageSquare} label="Forums" count={128} isCollapsed={isCollapsed} />
          <NavItem icon={ShoppingCart} label="Shopping" count={8} isCollapsed={isCollapsed} />
          <NavItem icon={Tag} label="Promotions" count={21} isCollapsed={isCollapsed} />
        </div>
      </ScrollArea>
    </div>
  )
}

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-[300px] lg:max-w-[400px]">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search..." className="pl-8 w-full" />
    </div>
  )
}

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@username" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ThemeToggle = ({ setTheme }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <Sidebar isCollapsed={false} />
      </SheetContent>
    </Sheet>
  )
}

const TopBar = ({ theme, setTheme }) => {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <MobileNav />
        <div className="flex items-center space-x-4 md:ml-auto">
          <SearchBar />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

const DashboardLayout = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system'
    }
    return 'system'
  })

  const applyTheme = useCallback((newTheme) => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [theme, applyTheme])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return (
    <div className={`flex flex-col h-screen ${theme}`}>
      <TopBar theme={theme} setTheme={handleThemeChange} />
      <div className="flex-grow flex overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
          }}
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={15}
            collapsible={true}
            minSize={5}
            maxSize={15}
            collapsedSize={4}
            className={cn('hidden md:block bg-muted/50')}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className="hidden md:flex" />
          <ResizablePanel defaultSize={80}>
            <ScrollArea className="h-full">
              <div className="flex items-center justify-center p-6">
                <h1 className="text-3xl font-bold">Main Content Area</h1>
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default DashboardLayout
