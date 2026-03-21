export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-foreground">Nexus Ops</a>
          <a href="/" className="text-sm font-medium text-foreground hover:text-primary">Back Home</a>
        </nav>
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. User Responsibilities</h2>
            <p className="text-muted-foreground">Users are responsible for maintaining the confidentiality of their account information and are fully responsible for all activities that occur under their account.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. Project Posting</h2>
            <p className="text-muted-foreground">Homeowners posting projects must provide accurate information and reasonable descriptions. Projects deemed inappropriate may be removed at our discretion.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Contractor Obligations</h2>
            <p className="text-muted-foreground">Contractors agree to provide professional services and maintain all necessary licenses and insurance as required by law.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">Nexus Operations is provided "as is" without warranties. We are not liable for indirect, incidental, or consequential damages.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Modifications</h2>
            <p className="text-muted-foreground">We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of modified terms.</p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Last updated: March 2024</p>
        </div>
      </section>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Nexus Operations. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
