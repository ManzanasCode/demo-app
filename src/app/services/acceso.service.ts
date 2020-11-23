import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuarios } from '../interfaces/usuarios'

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private usuarios_FB: AngularFireList<Usuarios>;

  constructor(private db: AngularFireDatabase) {
    this.usuarios_FB = this.db.list('/USUARIOS', (ref) =>
      ref.orderByChild('USUARIO')
    );
  }

  getUsuarios(): Observable<Usuarios[]> {
    //? this.jugadoresDB ya tiene la base de datos.
    //? snapshotChanges obtiene la informacion en este momento.
    //? Obtiene los datos junto con la Key
    //? Con Pipe permite hacer modificaciones
    //? Con Map haremos un cambio, que por cada uno de los jugadores retornaremos la informacion,
    //? y se Agregue una Key.
    //? El formato de key siempre es $key.
    //? Payload es por donde esta viajando la data.
    return this.usuarios_FB.snapshotChanges().pipe(
      //?A veces hay que importar map manualmente de rsjs/operators
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  addUsuario(usuario: Usuarios) {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo record a la tabla.
    return this.usuarios_FB.push(usuario);
  }

  //Borrar un Jugador de la DB
  deleteUsuario(id: string) {
    //? Que base de datos afectaremos? Jugadores.
    //? El id del jugador que deseamos eliminar.
    this.db.list('/USUARIOS').remove(id);
  }

  //Editar un Jugador
  editaUsuario(newUsuario) {
    //? Salvamos el Key.
    //? Eliminamos el registro anterior con el Key.
    //? Nuevamente asignamos a ese registro la nueva información en la base de datos.
    //? FireBase no acepta que ya se contenga una Key, por eso se hizo la Key opcional.
    //? Al borrar o actualizar daria problema sino fuera opcional.
    const $key = newUsuario.$key;
    delete newUsuario.$key;
    this.db.list('/USUARIOS').update($key, newUsuario);
  }

}
