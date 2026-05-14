from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="EduPets")

app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


PAGES = {
    "/": "index.html",
    "/index": "index.html",
    "/login": "login.html",
    "/registro": "registro.html",
    "/mascota": "mascota.html",
    "/tienda": "tienda.html",
    "/examenes": "examenes.html",
    "/ejercicio1": "ejercicio1.html",
    "/ejercicio2": "ejercicio2.html",
    "/ejercicio3": "ejercicio3.html",
    "/ejercicio4": "ejercicio4.html",
    "/player": "player.html",
    "/que-es": "que es.html",
    "/por-que": "por que.html",
    "/equipo": "equipo.html",
}

LEGACY_PAGES = {
    "/index.html": "index.html",
    "/login.html": "login.html",
    "/registro.html": "registro.html",
    "/mascota.html": "mascota.html",
    "/Mascota.html": "mascota.html",
    "/tienda.html": "tienda.html",
    "/Tienda.html": "tienda.html",
    "/examenes.html": "examenes.html",
    "/Examenes.html": "examenes.html",
    "/ejercicio1.html": "ejercicio1.html",
    "/ejercicio2.html": "ejercicio2.html",
    "/ejercicio3.html": "ejercicio3.html",
    "/ejercicio4.html": "ejercicio4.html",
    "/player.html": "player.html",
    "/que es.html": "que es.html",
    "/por que.html": "por que.html",
    "/equipo.html": "equipo.html",
}


def render_page(request: Request, template_name: str) -> HTMLResponse:
    return templates.TemplateResponse(request=request, name=template_name)


def page_handler(template_name: str):
    async def handler(request: Request) -> HTMLResponse:
        return render_page(request, template_name)

    return handler


for route_path, template_name in {**PAGES, **LEGACY_PAGES}.items():
    app.add_api_route(
        route_path,
        page_handler(template_name),
        response_class=HTMLResponse,
        methods=["GET"],
    )


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
