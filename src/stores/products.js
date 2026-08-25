import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import api from '../api'

export const useProductStore = defineStore('products', () => {
  const productos = ref([])
  const cargando = ref(false)
  const errorGlobal = ref('')

  const filtros = reactive({
    busqueda: '',
    ordenar_por: 'created_at'
  })

  const paginacion = reactive({
    paginaActual: 1,
    porPagina: 10,
    totalPaginas: 1,
    totalRegistros: 0
  })

  const aplicarPaginacion = items => {
    paginacion.totalRegistros = items.length
    paginacion.totalPaginas = Math.max(1, Math.ceil(items.length / paginacion.porPagina))
    if (paginacion.paginaActual > paginacion.totalPaginas) {
      paginacion.paginaActual = paginacion.totalPaginas
    }

    const inicio = (paginacion.paginaActual - 1) * paginacion.porPagina
    const fin = inicio + paginacion.porPagina
    productos.value = items.slice(inicio, fin)
  }

  const ordenar = items => {
    const list = [...items]
    if (filtros.ordenar_por === 'price') {
      list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
    } else if (filtros.ordenar_por === 'stock') {
      list.sort((a, b) => Number(a.stock || 0) - Number(b.stock || 0))
    } else {
      list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
    }
    return list
  }

  const obtenerProductos = async () => {
    cargando.value = true
    errorGlobal.value = ''

    try {
      const response = await api.get('/products', {
        params: {
          q: filtros.busqueda
        }
      })

      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.data)
          ? response.data.data
          : []

      aplicarPaginacion(ordenar(data))
    } catch (error) {
      errorGlobal.value = error?.response?.data?.message || 'No se pudo cargar el catálogo.'
      productos.value = []
      paginacion.totalRegistros = 0
      paginacion.totalPaginas = 1
    } finally {
      cargando.value = false
    }
  }

  const cambiarPagina = async pagina => {
    paginacion.paginaActual = pagina
    await obtenerProductos()
  }

  return {
    productos,
    cargando,
    errorGlobal,
    filtros,
    paginacion,
    obtenerProductos,
    cambiarPagina
  }
})
