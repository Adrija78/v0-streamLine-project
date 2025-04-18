import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Facebook, Instagram, Linkedin, Menu, Twitter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="StreamLine Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold">StreamLine</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex">
              <Link href="#get-started">Get Started</Link>
            </Button>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="#features" className="text-sm font-medium hover:text-primary">
                    Features
                  </Link>
                  <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                    Testimonials
                  </Link>
                  <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                    Pricing
                  </Link>
                  <Link href="#contact" className="text-sm font-medium hover:text-primary">
                    Contact
                  </Link>
                  <Button asChild className="mt-4">
                    <Link href="#get-started">Get Started</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow Like Never Before
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Boost productivity, reduce overhead, and focus on what matters most with our all-in-one platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="px-8">
                    <Link href="#get-started">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#demo">Request Demo</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Hero Image"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need in One Place
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to manage your business efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Automated Workflows</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Automate repetitive tasks and focus on what matters most to your business.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Real-time Analytics</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Get insights into your business performance with our powerful analytics tools.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Team Collaboration</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Work together seamlessly with your team, no matter where they are located.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Enterprise Security</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Keep your data safe with our enterprise-grade security features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers have to say about StreamLine.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Customer"
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">CEO, TechStart</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "StreamLine has completely transformed how we manage our projects. We've seen a 40% increase in
                    productivity since implementing it."
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Customer"
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Michael Chen</h3>
                      <p className="text-sm text-muted-foreground">CTO, GrowthLabs</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The analytics features alone are worth the investment. We now have insights we never had before,
                    helping us make better decisions."
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Customer"
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Emily Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">Operations Manager, Elevate</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Customer support is exceptional. Any time we've had questions, the team has been quick to respond
                    and incredibly helpful."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {/* Starter Plan */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="text-4xl font-bold">
                    $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground">Perfect for small teams just getting started.</p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Up to 5 team members</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>5GB storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Button asChild className="mt-auto w-full">
                    <Link href="#get-started">Get Started</Link>
                  </Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                  Popular
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold">Pro</h3>
                  <p className="text-4xl font-bold">
                    $79<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground">Ideal for growing businesses with more needs.</p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Up to 20 team members</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>20GB storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Custom integrations</span>
                    </li>
                  </ul>
                  <Button asChild className="mt-auto w-full">
                    <Link href="#get-started">Get Started</Link>
                  </Button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-4xl font-bold">
                    $199<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground">For large organizations with complex requirements.</p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Enterprise analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Unlimited storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Custom development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>SLA guarantees</span>
                    </li>
                  </ul>
                  <Button asChild className="mt-auto w-full">
                    <Link href="#get-started">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-emerald-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Streamline Your Business?
                </h2>
                <p className="max-w-[900px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses that trust StreamLine to help them grow.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                  />
                  <Button type="submit" className="bg-white text-emerald-600 hover:bg-emerald-50">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-emerald-100">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="w-full py-6 md:py-12 bg-gray-900 text-gray-300">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="StreamLine Logo"
                  width={32}
                  height={32}
                  className="rounded bg-white"
                />
                <span className="text-xl font-bold text-white">StreamLine</span>
              </div>
              <p className="text-sm text-gray-400">
                Streamline your workflow like never before with our all-in-one platform.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm hover:text-white">
                  Features
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Pricing
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Integrations
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Changelog
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm hover:text-white">
                  About
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Blog
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Careers
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Legal</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm hover:text-white">
                  Terms
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Privacy
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Cookies
                </Link>
                <Link href="#" className="text-sm hover:text-white">
                  Licenses
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} StreamLine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
