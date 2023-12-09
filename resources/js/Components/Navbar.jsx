export default function Navbar() {
    return (
        <div className="NavContainer">
            <nav class="navbar navbar-expand-lg navbar-dark bg-transparent border-bottom border-body">
                <div class="container-fluid">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="typing">
                                    Home
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href={route('dashboard')}>
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
