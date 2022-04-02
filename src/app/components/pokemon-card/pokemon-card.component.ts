import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  data: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  trimName(name: string){
    return name.indexOf('special') == 0 ? name.replace('special','s') : name;
  }

  getPokemons(){
    let pokemonData;
   
    for(let i = 1; i <= 150; i++){
      this.pokemonService.getPokemons(i).subscribe({
        next: (v) => {
          pokemonData = {
            position: i,
            image: v.sprites.front_default,
            name: v.name,
            abilities: v.abilities,
            stats: v.stats
          };

          this.data.push(pokemonData);
        },
        error: (e) => console.log(e,'error'),
        complete: () => console.log('Completado')
      })
    }

    this.data.sort((a,b) => a.position - b.position);
    console.log(this.data);
  }

}
