# front-AppShow — React + TypeScript + Vite

Repo: `AppShowroom-Frontend` · rama principal `main` · trabajo en `dev`. Contexto general: `../AGENTS.md`.

## Estructura (`src/`)

| Carpeta | Contenido |
|---|---|
| `pages/` | `homePage`, `productPage`, `contactoPage`, `adminPage` |
| `components/admin/` | `adminLayouts.tsx` (tabs por estado local), `sidebar`, `dashbordTab`, `productoTab`, `categoriasTab`, `usuarioTab`, formularios |
| `components/card/` | `productCard`, `carritoModal`, `categoriaFilter` |
| `components/home/` · `login/` · `ui/` | secciones del home · `authModal`, `loginForm`, `registerForm` · `toast`, `confirmDialog` |
| `components/layotus/` | `header`, `footer`, `protectedRoute` (**"layotus" es un typo existente; no renombrar sin pedirlo**, rompe imports) |
| `context/` | `auth.provider` / `auth.context` (JWT decodificado en cliente), `carrito.context` |
| `hooks/` | `useAuth`, `useCarrito`, `useProduct`, `useCategorias`, `useUsuario` (`*.hook.tsx`) |
| `services/` | `http.client.ts` (axios + interceptors) y un `<dominio>.service.ts` por recurso |
| `types/` | `<dominio>.interfaces.ts` (DTOs del back) |
| `utils/validates/` | esquemas de validación (zod) |

Rutas (`App.tsx`): `/`, `/contacto`, `/producto`, `/admin` (envuelta en `<ProtectedRoute requiredRole="Admin">`).

## Convenciones observadas

- Flujo de datos: `types` → `services` (axios) → `hooks` (estado, loading, error) → componente. Los componentes no llaman a axios directo.
- Todos los requests usan `apiClient` de `services/http.client.ts`.
- Formularios con `react-hook-form` + `zod`. UI con Bootstrap 5 y un `.css` junto a cada componente. Íconos: `lucide-react`.
- Feedback al usuario: `Toast` (`notify(msg, 'ok' | 'error')`) y `ConfirmDialog`.
- Los tipos replican los DTOs del back en camelCase (`ProductoDto`, `CarritoDto`...). Si cambia un DTO del back, actualizá el `types/` correspondiente.
- La protección de `/admin` es solo de UI: el back es quien debe rechazar.

## Comandos

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  (tiene que pasar antes de cada PR)
npm run lint
```
Variables (`.env`, no versionado; plantilla en `.env.example`): `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`.

## Problemas conocidos (verificados leyendo el código)

1. **Dashboard con datos falsos:** `components/admin/dashbordTab.tsx` tiene "12 pedidos", "$ 450k", "3 stock crítico" hardcodeados. Es la pantalla a reemplazar con métricas reales.
2. **"Finalizar compra"** en `carritoModal.tsx` (`btn-checkout`) no tiene `onClick`. Depende de que el back tenga pedidos.
3. **Interceptor 401** (`http.client.ts`): el `if (status === 500)` está anidado dentro del bloque `401`, así que nunca se ejecuta.
4. Varios hooks hacen `catch (error) { throw new Error(...) }` y pierden la causa original.
5. No hay librería de gráficos instalada: usar `recharts` (verificar compatibilidad con React 19 al instalar).
6. `git status` muestra todo modificado por finales de línea (CRLF); ver `../AGENTS.md`.
7. Sin tests.

## Pendiente de producto

Reemplazar `DashboardTab` por métricas reales con gráficos mensuales, conectar el checkout y agregar "Mis pedidos": ver `../docs/PLAN-METRICAS.md`.
