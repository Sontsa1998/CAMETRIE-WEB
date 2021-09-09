<template>
  <div>
    <q-layout view="lHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-red">
        <q-toolbar>
          <q-toolbar-title>CAMETRIE WEB <q-icon name="mic" /></q-toolbar-title>
          <q-btn flat label="V1.2.22" round dense />
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-btn flat v-if="dark == false" @click="changeDarkMode()" round dense icon="nights_stay" />
          <q-btn flat v-if="dark == true" @click="changeDarkMode()" round dense icon="settings_brightness" />
        </q-toolbar>
        <q-toolbar inset>
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Home" icon="home" />
            <q-breadcrumbs-el label="Requêtes" icon="widgets" />
            <q-breadcrumbs-el :label="env" icon="radio" />
            <q-breadcrumbs-el clickable @click="carousel = true" style="color: white; cursor: pointer">
              <a href="" style="color: white;">Changer d'Environnement</a>
            </q-breadcrumbs-el>
          </q-breadcrumbs>
        </q-toolbar>
      </q-header>

      <q-footer class="bg-red text-center" elevated>
        <q-toolbar>
          <q-toolbar-title style="font-size: 12px"> <q-icon  name="copyright" /> {{ new Date().getFullYear() }} Copyright. All rights reserved. | Developpé par SEW CAMETRIE</q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-dialog v-model="carousel">
        <q-card>
        <q-card-section>
          <div class="text-h6">Environnement</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div v-if="env == 'CAMEROUN RADIO' ">
              <div class="row justify-center">
                <q-icon name="radio" color="red" size="56px" /><q-icon name="trending_flat" color="red" size="56px" /><q-icon name="live_tv" color="red" size="56px" />
              </div>
            </div>
            <div v-if="env == 'CAMEROUN TV' ">
              <div class="row justify-center">
                <q-icon name="live_tv" color="red" size="56px" /><q-icon name="trending_flat" color="red" size="56px" /><q-icon name="radio" color="red" size="56px" />
              </div>
            </div>

            <div class="q-mt-md text-center">
              {{ env == 'CAMEROUN RADIO'
              ? "Vous êtes actuellement connecté sur la "+env+", En cliquant sur changer d'environnement, vous aller être connecté à la Télévision !"
              : "Vous êtes actuellement connecté sur la "+env+", En cliquant sur changer d'environnement, vous aller être connecté à la Radio !" }}
            </div>
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn color="red" @click="changerEnvironnement" label="Changer d'environnement" v-close-popup />
        </q-card-actions>
      </q-card>
      </q-dialog>
      <q-dialog
        v-model="fullWidth"
        full-width
      >
        <q-card>
          <q-card-section class="row items-center q-pb-none bg-red text-white">
            <div class="text-h6">Requête</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="">
            <div class="row justify-between">

                <!-- Presentation des criteres -->
                <div class="col-3 col-md-3">
                <q-list bordered separator>
                    <q-item clickable @click="etat = 'vagues'; title = 'Vague(s) sélectionnée(s)'; search = '' " v-ripple>
                    <q-item-section>Vagues({{ vagues.length }})</q-item-section>
                    </q-item>
                    <q-item clickable @click="etat = 'regions'; title = 'Région(s) sélectionnée(s)'; search = ''  " v-ripple>
                    <q-item-section>Régions({{ regions.length }})</q-item-section>
                    </q-item>
                    <q-item clickable @click="etat = 'jours'; title = 'Jour(s) sélectionnée(s)'; search = ''  " v-ripple>
                    <q-item-section>Jours({{ jours.length }})</q-item-section>
                    </q-item>
                    <q-item clickable @click="etat = 'cibles'; title = 'Cible(s) sélectionnée(s)'; search = ''  " v-ripple>
                    <q-item-section>Cibles({{ cibles.length }})</q-item-section>
                    </q-item>
                    <q-item v-if="env == 'CAMEROUN RADIO'" clickable @click="etat = 'stations'; title = 'Station(s) sélectionnée(s)'; search = ''  " v-ripple>
                    <q-item-section>Stations({{ stations.length }})</q-item-section>
                    </q-item>
                    <q-item v-if="env == 'CAMEROUN TV'" clickable @click="etat = 'chaines'; title = 'Chaine(s) sélectionnée(s)'; search = ''  " v-ripple>
                    <q-item-section>Chaines({{ chaines.length }})</q-item-section>
                    </q-item>
                    <q-item clickable @click="etat = 'tranches'; title = 'Tranche(s) sélectionnée(s)'; search = ''  " v-ripple>
                    <q-item-section>Tranches({{ tranches.length }})</q-item-section>
                    </q-item>
                    <q-item clickable @click="etat = 'indicateurs'; title = 'Indicateur(s) sélectionnée(s)'; search = ''  " v-ripple>
                    <q-item-section>Indicateurs({{ indicateurs.length }})</q-item-section>
                    </q-item>
                    <q-item clickable @click="etat = 'disposition' " v-ripple>
                    <q-item-section>Disposition(0)</q-item-section>
                    </q-item>
                </q-list>
                </div>

                <!-- Presentation des details des criteres -->
                <div class="q-px-md col-4 col-md-4">
                    <q-card class="my-card">
                        <q-card-section class="bg-red text-white">
                        <q-input label-color="white" bg-color="red" hide-bottom-space="true"
                            dense
                            input-style="height: 12px; font-size: 14px; color: white" placeholder="Rechercher..+"
                            v-model="search" color="white">
                            <template v-slot:prepend>
                            <q-icon color="white" name="search" />
                            </template>
                        </q-input>
                        </q-card-section>
                        <q-scroll-area
                        :thumb-style="thumbStyle"
                        :bar-style="barStyle"
                        style="height: 350px;"
                        >
                        <q-card-section style="height: 340px; bottom: 10px">
                            <div v-if="etat == 'vagues' ">
                                <q-list v-for="(item, id) in filteredListVagues" :key="id" bordered separator>
                                    <q-item clickable @dblclick="getSelectionItems(item)" v-ripple>
                                        <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="filteredListVagues.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'regions' ">
                                <q-list v-for="(item, id) in filteredListRegions" :key="id" bordered separator>
                                    <q-item clickable @dblclick="getSelectionItems(item)" v-ripple>
                                        <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="filteredListRegions.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'jours' ">
                                <q-list v-for="(item, id) in filteredListJours" :key="id" bordered separator>
                                    <q-item clickable @dblclick="getSelectionItems(item)" v-ripple>
                                        <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="filteredListJours.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'cibles' ">
                                <q-list v-for="(item, id) in filteredListCibles" :key="id" bordered class="rounded-borders">
                                    <q-expansion-item expand-separator :label="item.name" v-if="confirm === false">
                                        <q-list class="bg-grey-5" v-for="(items, index) in item.data" :key="index" bordered separator>
                                        <q-item clickable @dblclick="getSingleCibles(items, item.name)"  v-ripple>
                                            <q-item-section>{{ items.name }}</q-item-section>
                                        </q-item>
                                        </q-list>
                                    </q-expansion-item>
                                    <q-expansion-item v-if="confirm === true && item.name != 'Ensemble' " expand-separator :label="item.name" >
                                        <q-list class="bg-grey-5" v-for="(items, index) in item.data" :key="index" bordered separator>
                                        <q-itemclickable  v-ripple>
                                            <q-item-section v-if="item.name == 'Sexe' "><q-radio v-model="sexe" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Niveau Scolaire' "><q-radio v-model="niveau" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Nombre d\'Enfant' "><q-radio v-model="enfant" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Job' "><q-radio v-model="job" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Nombre de Moto' "><q-radio v-model="moto" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Nombre de Voiture' "><q-radio v-model="voiture" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Nombre de TV' "><q-radio v-model="tv" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Revenu Mensuel' "><q-radio v-model="salaire" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Langues' "><q-radio v-model="langue" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Abonnement' "><q-radio v-model="abonnement" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Age' "><q-radio v-model="age" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Cables' "><q-radio v-model="cable" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'HautDiplome' "><q-radio v-model="diplome" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                            <q-item-section v-if="item.name == 'Status' "><q-radio v-model="status" :val="items.id" :label="items.name" color="cyan" /></q-item-section>
                                        </q-itemclickable>
                                        </q-list>
                                    </q-expansion-item>
                                </q-list>
                                <div v-if="filteredListCibles.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'stations' && env == 'CAMEROUN RADIO'">
                                <q-list v-for="(item, id) in filteredListStations" :key="id" bordered separator>
                                    <q-item clickable @dblclick="getSelectionItems(item)" v-ripple>
                                        <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="filteredListStations.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'chaines' && env == 'CAMEROUN TV'">
                                <q-list v-for="(item, id) in filteredListChaines" :key="id" bordered separator>
                                    <q-item clickable @dblclick="getSelectionItems(item)" v-ripple>
                                        <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="filteredListChaines.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'tranches' ">
                                <q-list v-for="(item, id) in filteredListTranches" :key="id" bordered separator>
                                    <q-item clickable @dblclick="getSelectionItems(item)" v-ripple>
                                        <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="filteredListTranches.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'indicateurs' ">
                                <q-list v-for="(item, id) in filteredListIndicateurs" :key="id" bordered separator>
                                    <q-item clickable @dblclick="getSelectionItems(item)" v-ripple>
                                        <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-if="filteredListIndicateurs.length === 0"  class="text-center text-grey-5 text-italic">Aucune données trouvées</div>
                            </div>
                            <div v-if="etat == 'disposition' ">
                                <q-list
                                    v-mutation="handler1"
                                    @dragenter="onDragEnter"
                                    @dragleave="onDragLeave"
                                    @dragover="onDragOver"
                                    @drop="onDrop"
                                    v-for="(id, i) in element" :key="i" bordered separator>
                                        <q-item :id="id.id" draggable="true" @dragstart="onDragStart" clickable>
                                            <q-item-section>{{ id.name }}</q-item-section>
                                        </q-item>

                                </q-list>

                            </div>
                        </q-card-section>
                        </q-scroll-area>
                    </q-card>
                </div>

                <!-- Presentation des Boutons -->
                <div v-if="etat != 'disposition' " style="justify-content: center; align-items: center"  class="text-center col-1 col-md-1">
                    <q-list>
                    <q-item clickable v-ripple>
                        <q-item-section>
                        <div>
                            <q-btn v-if="etat == 'cibles' " @click="confirm = !confirm" color="primary" round :icon="confirm == true ? 'checklist_rtl' : 'radio_button_checked' ">
                            <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                {{ confirm == true ? "Activer le Mode Sélection Simple" : "Activer le Mode Sélection Multiple" }}
                            </q-tooltip>
                            </q-btn>
                        </div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-if="etat == 'cibles' && confirm == true ">
                        <q-item-section>
                        <div style="transform: rotateY(180deg);">
                            <q-btn @click="multiSelection()" color="cyan" round icon="reply">
                            <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                Envoyer cette composition
                            </q-tooltip>
                            </q-btn>
                        </div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-if="etat == 'cibles' && confirm == true ">
                        <q-item-section>
                        <div style="transform: rotateY(180deg);">
                            <q-btn @click="refresh()" color="yellow" round icon="cached">
                            <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                Rafraîchir la liste
                            </q-tooltip>
                            </q-btn>
                        </div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                        <div style="transform: rotateY(180deg);">
                            <q-btn :disabled="etat == 'cibles' " @click="addAllData" color="green" round icon="reply_all">
                            <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                Sélectionner tous ces elements
                            </q-tooltip>
                            </q-btn>
                        </div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                        <div>
                            <q-btn @click="removeAllData" color="red" round icon="reply_all">
                            <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                Supprimer tous ces elements
                            </q-tooltip>
                            </q-btn>
                        </div>
                        </q-item-section>
                    </q-item>
                    </q-list>
                </div>

                <!-- Presentation des choix -->
                <div v-if="etat != 'disposition' " class="col-4 col-md-4">
                    <q-card class="my-card">
                    <q-card-section class="bg-red text-white">
                        {{ title }}
                    </q-card-section>
                    <q-scroll-area
                    :thumb-style="thumbStyle"
                    :bar-style="barStyle"
                    style="height: 384px;"
                    >
                        <q-card-section class="" style="height: 384px">

                            <div v-if="etat == 'vagues' ">
                                <q-list v-for="(item, id) in vagues" :key="id" bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-if="etat == 'regions' ">
                                <q-list v-for="(item, id) in regions" :key="id"  bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-if="etat == 'jours' ">
                                <q-list v-for="(item, id) in jours" :key="id"   bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-if="etat == 'cibles' ">
                                <q-list v-for="(item, id) in cibles" :key="id"    bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-if="etat == 'stations' && env == 'CAMEROUN RADIO' ">
                                <q-list v-for="(item, id) in stations" :key="id"   bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-if="etat == 'chaines' && env == 'CAMEROUN TV' ">
                                <q-list v-for="(item, id) in chaines" :key="id"   bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-if="etat == 'tranches' ">
                                <q-list v-for="(item, id) in tranches" :key="id"   bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-if="etat == 'indicateurs' ">
                                <q-list v-for="(item, id) in indicateurs" :key="id"   bordered separator>
                                    <q-item clickable @dblclick="deleteItemFromSelection(item)" v-ripple>
                                    <q-item-section>{{ item.name }}</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>

                        </q-card-section>
                    </q-scroll-area>
                    </q-card>
                </div>
                <div v-if="etat === 'disposition'" class="text-center col-5 col-md-5">

                    <div
                        v-mutation="handler2"
                        @dragenter="onDragEnter"
                        @dragleave="onDragLeave"
                        @dragover="onDragOver"
                        @drop="onDrop"
                        class="row col-5 col-md-5 drop-target "
                    >
                        <q-card class="col-6">
                            <q-card-section>COLONNES</q-card-section>
                            <q-card-section>
                                <q-list bordered separator>
                                    <q-item>
                                        <q-item-section></q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section></q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section></q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                        <q-card class="col-6">
                            <q-card-section>LIGNES</q-card-section>
                            <q-card-section>
                                <q-list bordered separator>
                                    <q-item>
                                        <q-item-section></q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section></q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section></q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>

                    </div>
                </div>

            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn color="cyan" label="Enregistrer" v-close-popup />
            <q-btn @click="calculer()" color="green" label="Calculer" v-close-popup />
            <q-btn color="primary" label="Exporter" v-close-popup />
            <q-btn @click="annuler()" color="red" label="Annuler" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="red" name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="red" name="logout" />
              </q-item-section>

              <q-item-section>
                Déconnexion
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top bg-red"  style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="profile.jpg">
            </q-avatar>
            <div class="text-weight-bold">NOM COMPLET</div>
            <div>@Username</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container v-if="response.length == 0">
        <q-page padding class="loadCenter">
          <q-spinner-clock v-if="loading == true"
            color="red"
            size="8em"
          />
          
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-tooltip content-class="bg-red" anchor="center left" self="center right" :offset="[10, 10]">
              Nouvelle Requete
            </q-tooltip>
            <q-btn @click="fullWidth = true" fab icon="add" color="red" />
          </q-page-sticky>
        </q-page>
      </q-page-container>

      <q-page-container v-if="loading == false && response.length != 0">
        <q-page padding >
          <TableResult :response="response" />
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab icon="arrow_upward" direction="up" color="red" >
              <q-fab-action color="cyan" icon="edit_note">
                <q-tooltip content-class="bg-red" anchor="center left" self="center right" :offset="[10, 10]">
                  Modifier la requête
                </q-tooltip>
              </q-fab-action>
              <q-fab-action color="green" icon="save_alt">
                <q-tooltip content-class="bg-red" anchor="center left" self="center right" :offset="[10, 10]">
                  Sauvegarder la requête
                </q-tooltip>
              </q-fab-action>
              <q-fab-action clickable @click="fullWidth = true"   color="primary" icon="add">
                <q-tooltip content-class="bg-primary" anchor="center left" self="center right" :offset="[10, 10]">
                  Nouvelle requête
                </q-tooltip>
              </q-fab-action>
            </q-fab>
          </q-page-sticky>
        </q-page>
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
import RegionList from './data/regions'
import DaysList from './data/jours'
import Heure from './data/heure'
import ChainesList from './data/chaines'
import StationsList from './data/stations'
import cibles from './data/cibles'
import indicateurs from './data/indicateurs'
import vagues from './data/vagues'
import { ref } from 'vue'
import axios from 'axios'
import TableResult from './components/Tables.vue'

export default {
    setup () {
    const status1 = ref([])
    const status2 = ref([])

    return {
      status1,
      status2,

      handler1 (mutationRecords) {
        status1.value = []
        for (const index in mutationRecords) {
          const record = mutationRecords[ index ]
          const info = `type: ${record.type}, nodes added: ${record.addedNodes.length > 0 ? 'true' : 'false'}, nodes removed: ${record.removedNodes.length > 0 ? 'true' : 'false'}, oldValue: ${record.oldValue}`
          status1.value.push(info)
        }
      },

      handler2 (mutationRecords) {
        status2.value = []
        for (const index in mutationRecords) {
          const record = mutationRecords[ index ]
          const info = `type: ${record.type}, nodes added: ${record.addedNodes.length > 0 ? 'true' : 'false'}, nodes removed: ${record.removedNodes.length > 0 ? 'true' : 'false'}, oldValue: ${record.oldValue}`
          status2.value.push(info)
        }
      },

      // store the id of the draggable element
      onDragStart (e) {
        e.dataTransfer.setData('text', e.target.id)
        e.dataTransfer.dropEffect = 'move'
      },

      onDragEnter (e) {
        // don't drop on other draggables
        if (e.target.draggable !== true) {
          e.target.classList.add('drag-enter')
        }
      },

      onDragLeave (e) {
        e.target.classList.remove('drag-enter')
      },

      onDragOver (e) {
        e.preventDefault()
      },

      onDrop (e) {
        e.preventDefault()

        // don't drop on other draggables
        if (e.target.draggable === true) {
          return
        }

        const draggedId = e.dataTransfer.getData('text')
        const draggedEl = document.getElementById(draggedId)

        // check if original parent node
        if (draggedEl.parentNode === e.target) {
          e.target.classList.remove('drag-enter')
          return
        }

        // make the exchange
        draggedEl.parentNode.removeChild(draggedEl)
        e.target.appendChild(draggedEl)
        e.target.classList.remove('drag-enter')
      }
    }
  },
  components: {
    TableResult
  },
  data () {
    return {
      drawer: false,
      dark: false,
      carousel: false,
      confirm: false,
      env: 'CAMEROUN RADIO',
      boolENV: false,
      fullWidth: false,
      search: "",
      etat: "vagues",
      title: "Vague(s) sélectionnée(s)",
      loading : false,
      /**
       * Tableau de selections des elements
        */
        vagues: [],
        regions: [],
        jours: [],
        cibles: [],
        backup_cibles: [],
        MSM: [],
        stations: [],
        chaines: [],
        tranches: [],
        indicateurs: [],

      /**
       * Variables des Cibles
       */
      sexe: null,
      niveau: null,
      enfant: null,
      job: null,
      moto: null,
      voiture: null,
      tv: null,
      salaire: null,
      langue: null,
      abonnement: null,
      age: null,
      cable: null,
      diplome: null,
      status: null,
      disposition: false,
      element: [
          {
              id: "box1",
              name: "Vagues"
          },
          {
              id: "box2",
              name: "Regions"
          },
          {
              id: "box3",
              name: "Jours"
          },
          {
              id: "box4",
              name: "Cibles"
          },
          {
              id: "box5",
              name: "Stations"
          },
          {
              id: "box6",
              name: "Chaines"
          },
          {
              id: "box7",
              name: "Tranches"
          }
      ],
      idDrag: [
          "box1",
          "box2",
          "box3",
          "box4",
          "box5",
          "box6",
          "box7"
      ],
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },

      /**
       * RESULTAT DE NOTRE REQUETE
       */
      response: [],
      compteur: 0,
      start: false,
      end: 0,

    }
  },
  watch: {
    confirm: function (val, old) {
      if (val === true) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Mode MSM Activé avec succès'
        })
      }else{
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Mode Sélection simple avec succès'
        })
      }
    },
    start: function(val, old){
      /*if(val == true){
      this.end = 0
        setInterval(() => {
          this.compteur = this.compteur + 1
        },1000);
      }else{
        this.end = this.compteur
        this.compteur = 0
        console.log(this.end);
      }*/
    }
  },
  computed: {
        filteredListCibles() {
            return cibles.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        filteredListVagues() {
            return vagues.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        filteredListRegions() {
            return RegionList.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        filteredListJours() {
            return DaysList.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        filteredListStations() {
            return StationsList.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        filteredListChaines() {
            return ChainesList.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        filteredListTranches() {
            return Heure.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        filteredListIndicateurs() {
            return indicateurs.filter((product) => {
                return product.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
    },
  created(){

  },

  methods: {
    countdown(){
      this.compteur = this.compteur + 1
    },
    changeDarkMode(){
      this.dark = !this.dark
      this.$q.dark.set(this.dark)
    },
    refresh(){
      this.sexe = null
      this.niveau = null
      this.enfant = null
      this.job = null
      this.moto = null
      this.voiture = null
      this.tv = null
      this.salaire = null
      this.langue = null
      this.abonnement = null
      this.age = null
      this.cable = null
      this.diplome = null
      this.status = null
    },
    cutWorld(mot){
      let line = ""
      for (let i = 0; i < mot.length - 4; i++) {
        line += mot[i]
      }
      return line
    },
    multiSelection(){
      let request = "";
      let sql = "";
      let rows = []
      if (this.sexe != null) {
        let obj = {
          id: this.sexe,
          name: this.filteredListCibles[1].data[this.sexe -1].name,
          cats: "Sexe"
        }
        request = obj.name;
        rows.push(obj)

        sql = "(C53 = "+obj.id+") AND ";
      }
      if (this.niveau != null) {
        let obj = {
          id: this.niveau,
          name: this.filteredListCibles[2].data[this.niveau -1].name,
          cats: "Niveau Scolaire"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        sql += " (C58 = "+obj.id+") AND ";
      }
      if (this.enfant != null) {
        let obj = {
          id: this.enfant,
          name: this.filteredListCibles[3].data[this.enfant -1].name,
          cats: "Nombre d'Enfant"
        }
        request += " "+obj.name+" ";
        rows.push(obj)


        if (obj.id == 1) {
          sql += "(C52 BETWEEN 0 AND 3) AND "
        }else if(obj.id == 2){
          sql += "(C52 BETWEEN 4 AND 5) AND "
        }else if(obj.id == 3){
          sql += "(C52 BETWEEN 6 AND 10) AND ";
        }else{
          sql += "(C52 > 10) AND "
        }
      }
      if (this.job != null) {
        let obj = {
          id: this.job,
          name: this.filteredListCibles[4].data[this.job -1].name,
          cats: "Job"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        sql += "(C162_SQ2 ="+obj.id+" ) AND "
      }
      if (this.moto != null) {
        let obj = {
          id: this.moto,
          name: this.filteredListCibles[5].data[this.moto -1].name,
          cats: "Nombre de Moto"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        if (obj.id == 1) {
          sql += "(Q191_SQ2 BETWEEN 0 AND 3) AND "
        }else if(obj.id == 2){
          sql += "(Q191_SQ2 BETWEEN 4 AND 5) AND "
        }else if(obj.id == 3){
          sql += "(Q191_SQ2 BETWEEN 6 AND 10) AND ";
        }else{
          sql += "(Q191_SQ2 > 10) AND "
        }
      }
      if (this.voiture != null) {
        let obj = {
          id: this.voiture,
          name: this.filteredListCibles[6].data[this.voiture -1].name,
          cats: "Nombre de Voiture"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        if (obj.id == 1) {
          sql += "(Q191_SQ1 BETWEEN 0 AND 3) AND "
        }else if(obj.id == 2){
          sql += "(Q191_SQ1 BETWEEN 4 AND 5) AND "
        }else if(obj.id == 3){
          sql += "(Q191_SQ1 BETWEEN 6 AND 10) AND ";
        }else{
          sql += "(Q191_SQ1 > 10) AND "
        }
      }
      if (this.tv != null) {
        let obj = {
          id: this.tv,
          name: this.filteredListCibles[7].data[this.tv -1].name,
          cats: "Nombre de TV"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        if (obj.id == 1) {
          sql += "(Q198 BETWEEN 0 AND 3) AND "
        }else if(obj.id == 2){
          sql += "(Q198 BETWEEN 4 AND 5) AND "
        }else if(obj.id == 3){
          sql += "(Q198 BETWEEN 6 AND 10) AND ";
        }else{
          sql += "(Q198 > 10) AND "
        }
      }
      if (this.salaire != null) {
        let obj = {
          id: this.salaire,
          name: this.filteredListCibles[8].data[this.salaire -1].name,
          cats: "Revenu Mensuel"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

         sql += "(Q196 = "+obj.id+") AND "
      }
      if (this.langue != null) {
        let obj = {
          id: this.langue,
          name: this.filteredListCibles[9].data[this.langue -1].name,
          cats: "Langues"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        sql += "(Q193_SQ1 = "+obj.id+") AND "
      }
      if (this.abonnement != null) {
        let obj = {
          id: this.abonnement,
          name: this.filteredListCibles[10].data[this.abonnement -1].name,
          cats: "Abonnement"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        let comb = "";
        for (let j=1; j <= 8; j++) { 
            if (j == (obj.id)) {
                comb += "1-";
            } else {
                comb += "0-";
            }
        }
        sql += "(Q211 = "+comb+") AND ";
      }
      if (this.age != null) {
        let obj = {
          id: this.age,
          name: this.filteredListCibles[11].data[this.age -1].name,
          cats: "Age"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        if (obj.id == 1) {
          sql += "(C54 BETWEEN 0 AND 3) AND "
        }else if(obj.id == 2){
          sql += "(C54 BETWEEN 4 AND 5) AND "
        }else if(obj.id == 3){
          sql += "(C54 BETWEEN 6 AND 10) AND ";
        }else{
          sql += "(C54 > 10) AND "
        }
      }
      if (this.cable != null) {
        let obj = {
          id: this.cable,
          name: this.filteredListCibles[12].data[this.cable -1].name,
          cats: "Cables"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        let comb = "";                                                 
        for (let t=1; t <= 4; t++){ 
            if (t == (obj.id)) {
                comb += "1-";
            } else {
                comb += "0-";
            }
        }
        sql += "(Q206 = "+comb+") AND ";
      }
      if (this.diplome != null) {
        let obj = {
          id: this.diplome,
          name: this.filteredListCibles[13].data[this.diplome -1].name,
          cats: "HautDiplome"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        sql += "(C166_SQ2 = "+obj.id+") AND ";
      }
      if (this.status != null) {
        let obj = {
          id: this.status,
          name: this.filteredListCibles[14].data[this.status -1].name,
          cats: "Status"
        }
        request += " "+obj.name+" ";
        rows.push(obj)

        sql += "(C57 = "+obj.id+") ";
      }
      let obj = {
        id: this.MSM.length+1,
        name: request.trim(),
        cats: "Request"
      }
      let chris = sql.trim().endsWith("AND") ? this.cutWorld(sql.trim()) : sql.trim()
      let req = {
        id: this.MSM.length+1,
        name: chris,
        cats: "MSM"
      }
      if(this.cibles == []){
        this.cibles.push(obj)
        this.MSM.push(req)
      }else{
        let t = 0
        for (let i = 0; i < this.cibles.length; i++) {

          if (this.cibles[i].name === obj.name) {
            t = t + 1
          }

        }
        if (t === 0) {
          this.cibles.push(obj)
          this.MSM.push(req)
        }else{
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'mood_bad',
            message: 'Vous avez déjà sélectionné cette composition.'
          })
        }
      }
    },
    changerEnvironnement(){
      this.boolENV = ! this.boolENV
      if(this.boolENV == true){
        this.env = "CAMEROUN TV"
      }else{
        this.env = "CAMEROUN RADIO"
      }
        this.vagues      = []
        this.regions     = []
        this.jours       = []
        this.cibles      = []
        this.MSM         = []
        this.stations    = []
        this.chaines     = []
        this.tranches    = []
        this.indicateurs = []
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'done_all',
        message: 'Environnement mis à jour avec succès'
      })
    },
    addCheck(tab, item, label){

      let T = []
      if(tab == []){
        tab.push(item)
      }else{
        let t = 0
        for (let i = 0; i < tab.length; i++) {

          if (tab[i].name === item.name) {
              t = t + 1
          }

        }
        if (t === 0) {
          tab.push(item)
        }else{
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'mood_bad',
            message: 'Vous avez déjà sélectionné cette '+label
          })
        }
      }

    },
    getSelectionItems(donnees){
      if (this.etat === "vagues") {
       this.addCheck(this.vagues, donnees, "Vague")
      }
      if (this.etat === "regions") {
        this.addCheck(this.regions, donnees, "Région")
      }
      if (this.etat === "jours") {
        this.addCheck(this.jours, donnees, "Journée")
      }
      if (this.etat === "stations") {
        this.addCheck(this.stations, donnees, "Station")
      }
      if (this.etat === "chaines") {
        this.addCheck(this.chaines, donnees, "Chaine")
      }
      if (this.etat === "tranches") {
        this.addCheck(this.tranches, donnees, "Tranche Horaire")
      }
      if (this.etat === "indicateurs") {
        this.addCheck(this.indicateurs, donnees, "Indication")
      }

    },
    deleteItemFromSelection(item) {
      if (this.etat === "vagues") {
        const result = this.vagues.filter((items) => items !== item)
        this.vagues =  result
      }
      if (this.etat === "regions") {
        const result = this.regions.filter((items) => items !== item)
        this.regions = result
      }
      if (this.etat === "jours") {
        const result = this.jours.filter((items) => items !== item)
        this.jours = result
      }
      if (this.etat === "stations") {
        const result = this.stations.filter((items) => items !== item)
        this.stations = result
      }
      if (this.etat === "chaines") {
        const result = this.chaines.filter((items) => items !== item)
        this.chaines = result
      }
      if (this.etat === "tranches") {
        const result = this.tranches.filter((items) => items !== item)
        this.tranches = result
      }
      if (this.etat === "indicateurs") {
        const result = this.indicateurs.filter((items) => items !== item)
        this.indicateurs = result
      }
      if (this.etat === "cibles") {
        const result = this.cibles.filter((items) => items.name !== item.name)
        let vf = []
        for (let i = 0; i < this.MSM.length; i++) {
          if (this.MSM[i].id != item.id) {
            vf.push(this.MSM[i])
          }          
        }
        this.cibles = result
        this.MSM = vf

        console.log(this.MSM);
        console.log(this.cibles);
      }

    },
    addAllData: function(){
      if (this.etat === "vagues") {
        this.vagues = this.filteredListVagues
      }
      if (this.etat === "regions") {
        this.regions = this.filteredListRegions
      }
      if (this.etat === "jours") {
        this.jours = this.filteredListJours
      }
      if (this.etat === "stations") {
        this.stations = this.filteredListStations
      }
      if (this.etat === "chaines") {
        this.chaines = this.filteredListChaines
      }
      if (this.etat === "tranches") {
        this.tranches = this.filteredListTranches
      }
      if (this.etat === "indicateurs") {
        this.indicateurs = this.filteredListIndicateurs
      }
    },
    removeAllData: function(){
      if (this.etat === "vagues") {
        this.vagues = []
      }
      if (this.etat === "regions") {
        this.regions = []
      }
      if (this.etat === "jours") {
        this.jours = []
      }
      if (this.etat === "stations") {
        this.stations = []
      }
      if (this.etat === "chaines") {
        this.chaines = []
      }
      if (this.etat === "tranches") {
        this.tranches = []
      }
      if (this.etat === "indicateurs") {
        this.indicateurs = []
      }
      if (this.etat === "cibles") {
        this.cibles = []
        this.MSM = []
      }
    },
    getSingleCibles(item, cats){
      let obj = {
        id: item.id,
        name: item.name,
        cats: cats
      }
      let T = []
      if(this.cibles == []){
        this.cibles.push(obj)
      }else{
        let t = 0
        for (let i = 0; i < this.cibles.length; i++) {

          if (this.cibles[i].name === obj.name) {
            t = t + 1
          }

        }
        if (t === 0) {
          this.cibles.push(obj)
        }else{
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'mood_bad',
            message: 'Vous avez déjà sélectionné ce critère.'
          })
        }
      }
    },
    annuler(){
        this.vagues      = []
        this.regions     = []
        this.jours       = []
        this.cibles      = []
        this.MSM         = []
        this.stations    = []
        this.chaines     = []
        this.tranches    = []
        this.indicateurs = []
    },
    filtreTranche(val){
      let T = []
        for (let t=0; t < val.length; t++) { 
          let heure = "";
        
          for (let i = 2; i <= (val[t].id * 2); i++) { 

              if (i !== (val[t].id * 2) ) {
                  heure += "_";
              }else {
                  heure += "1";
              }

          }
          let hours = "( (Q238_SQ1 LIKE '"+heure+"%') OR (Q259_SQ1 LIKE '"+heure+"%') OR (Q280_SQ1 LIKE '"+heure+"%') OR (Q301_SQ1 LIKE '"+heure+"%') OR (Q322_SQ1 LIKE '"+heure+"%') OR (Q343_SQ1 LIKE '"+heure+"%') OR (Q364_SQ1 LIKE '"+heure+"%') OR (Q385_SQ1 LIKE '"+heure+"%') OR (Q406_SQ1 LIKE '"+heure+"%') OR (Q427_SQ1 LIKE '"+heure+"%') OR (Q448_SQ1 LIKE '"+heure+"%') )"; 
          T.push(hours)
        }
        return T;
    },
    filtreRegions(tab) {
        let town = "( C51 = "
        let tab_regions = []
        for (let i=0; i < tab.length; i++) {
            
            if (tab[i].id === 11) {

                town = "( C51 BETWEEN 1 AND  10 )";
                
            }else {

                if (tab.length === 1) {
                    town += tab[i].id +" ) "
                }else if (i === (tab.length - 1) ) {
                    town += tab[i].id +" ) ";
                } else {
                    town += tab[i].id +" ) ";
                } 

            }
            tab_regions.push(town);
            town = "( C51 = ";
            
        }
        return tab_regions;
    },
    filtreJours(tab){
        let days = "( C12_SQ22 = ";
        let tab_jours = [];
        for (let i=0; i < tab.length; i++) { 

            if (tab[i].id  === 8) {
                days = "( C12_SQ22 BETWEEN 1 AND 7 )";
            }else if (tab[i].id === 9) {
                days = "( C12_SQ22 BETWEEN 6 AND 7 )";
            } else if (tab[i].id  === 10) {
                days = "( C12_SQ22 = BETWEEN 1 AND 5 )";
            } else{
                if (tab.length === 1) {
                    days += tab[i].id+" ) ";
                }else if (i === tab.length - 1) {
                    days += tab[i].id+" ) ";
                } else {
                    days += tab[i].id+" ) ";
                }                
            }            
            tab_jours.push(days)
            days = "( C12_SQ22 = ";
            
        }
        return tab_jours;
    },
    filtreStations(tab){
      let tab_stations = [];
      let row = "( (Q228 = ";
      for (let i=0; i < tab.length; i++) { 
              
          if (tab.length === 1) {
              row += tab[i].id+") OR (Q249 = "+tab[i].id+") OR (Q270 = "+tab[i].id+") OR (Q291 = "+tab[i].id+") OR (Q312 = "+tab[i].id+") OR (Q333 = "+tab[i].id+") OR (Q354 = "+tab[i].id+") OR (Q375 = "+tab[i].id+") OR (Q396 = "+tab[i].id+") OR (Q417 = "+tab[i].id+") OR (Q438 = "+tab[i].id+") )";
          }else if (i === tab.length - 1) {
              row += tab[i].id+") OR (Q249 = "+tab[i].id+") OR (Q270 = "+tab[i].id+") OR (Q291 = "+tab[i].id+") OR (Q312 = "+tab[i].id+") OR (Q333 = "+tab[i].id+") OR (Q354 = "+tab[i].id+") OR (Q375 = "+tab[i].id+") OR (Q396 = "+tab[i].id+") OR (Q417 = "+tab[i].id+") OR (Q438 = "+tab[i].id+") )";
          } else {
              row += tab[i].id+") OR (Q249 = "+tab[i].id+") OR (Q270 = "+tab[i].id+") OR (Q291 = "+tab[i].id+") OR (Q312 = "+tab[i].id+") OR (Q333 = "+tab[i].id+") OR (Q354 = "+tab[i].id+") OR (Q375 = "+tab[i].id+") OR (Q396 = "+tab[i].id+") OR (Q417 = "+tab[i].id+") OR (Q438 = "+tab[i].id+") )";
          }
          tab_stations.push(row);
          row = "( (Q228 = ";
          
      }
      return tab_stations;
    },
    filtreChaines(tab){

      let tab_chaines = [];
      let row = "( (Q474 = ";
      for (let t=0; t < tab.length; t++) { 
              
          if (tab.length === 1) {
              row += tab[t].id+") OR (Q496 = "+tab[t].id+") OR (Q518 = "+tab[t].id+") OR (Q540 = "+tab[t].id+") OR (Q562 = "+tab[t].id+") OR (Q584 = "+tab[t].id+") OR (Q606 = "+tab[t].id+") OR (Q628 = "+tab[t].id+") OR (Q650 = "+tab[t].id+") OR (Q672 = "+tab[t].id+") OR (Q694 = "+tab[t].id+") )";
          }else if (t === tab.length - 1) {
              row += tab[t].id+") OR (Q496 = "+tab[t].id+") OR (Q518 = "+tab[t].id+") OR (Q540 = "+tab[t].id+") OR (Q562 = "+tab[t].id+") OR (Q584 = "+tab[t].id+") OR (Q606 = "+tab[t].id+") OR (Q628 = "+tab[t].id+") OR (Q650 = "+tab[t].id+") OR (Q672 = "+tab[t].id+") OR (Q694 = "+tab[t].id+") )";
          } else {
              row += tab[t].id+") OR (Q496 = "+tab[t].id+") OR (Q518 = "+tab[t].id+") OR (Q540 = "+tab[t].id+") OR (Q562 = "+tab[t].id+") OR (Q584 = "+tab[t].id+") OR (Q606 = "+tab[t].id+") OR (Q628 = "+tab[t].id+") OR (Q650 = "+tab[t].id+") OR (Q672 = "+tab[t].id+") OR (Q694 = "+tab[t].id+") )";
          }
          tab_chaines.push(row)
          row = "( (Q474 = ";
          
      }
      return tab_chaines;
    },
    filtreSingleCibles(tab){
      let T = []
      for (let i = 0; i < tab.length; i++) {
        let line = "";
        if (tab[i].cats == "Ensemble") {
          line = "(C53 BETWEEN 1 AND 2)";
        }
        else if (tab[i].cats == "Sexe") {
          line = "C53 = "+tab[i].id;
        }
        else if (tab[i].cats == "Niveau Scolaire") {
          line  = "C58 = "+tab[i].id;
        }
        else if (tab[i].cats == "Nombre d'Enfant") {
          if (tab[i].id == 1) {
            line = "(C52 BETWEEN 0 AND 3)"
          }else if(tab[i].id == 2){
            line = "(C52 BETWEEN 4 AND 5)"
          }else if(tab[i].id == 3){
            line = "(C52 BETWEEN 6 AND 10)";
          }else{
            line = "(C52 > 10)"
          }
        }
        else if (tab[i].cats == "Job") {
          line  = "(C162_SQ2 = "+tab[i].id+" )"
        }
        else if (tab[i].cats == "Nombre de Moto") {
          if (tab[i].id == 1) {
            line = "(Q191_SQ2 BETWEEN 0 AND 3)"
          }else if(tab[i].id == 2){
            line = "(Q191_SQ2 BETWEEN 4 AND 5)"
          }else if(tab[i].id == 3){
            line = "(Q191_SQ2 BETWEEN 6 AND 10)";
          }else{
            line = "(Q191_SQ2 > 10)"
          }

        }
        else if (tab[i].cats == "Nombre de Voiture") {
          if (tab[i].id == 1) {
            line = "(Q191_SQ1 BETWEEN 0 AND 3)"
          }else if(tab[i].id == 2){
            line = "(Q191_SQ1 BETWEEN 4 AND 5)"
          }else if(tab[i].id == 3){
            line = "(Q191_SQ1 BETWEEN 6 AND 10)";
          }else{
            line = "(Q191_SQ1 > 10)"
          }

        }
        else if (tab[i].cats == "Nombre de TV") {
          if (tab[i].id == 1) {
            line = "(Q198 BETWEEN 0 AND 3 )"
          }else if(tab[i].id == 2){
            line = "(Q198 BETWEEN 4 AND 5 )"
          }else if(tab[i].id == 3){
            line = "(Q198 BETWEEN 6 AND 10 )";
          }else{
            line = "(Q198 > 10 )"
          }
        }
        else if (tab[i].cats == "Revenu Mensuel") {
          line = "Q196 = "+tab[i].id
        }
        else if (tab[i].cats == "Langues") {
          line  = "(Q193_SQ1 = "+tab[i].id+")"
        }
        else if (tab[i].cats == "Abonnement") {
          let comb = "";
          for (let j=1; j <= 8; j++) { 
              if (j == (tab[i].id)) {
                  comb += "1-";
              } else {
                  comb += "0-";
              }
          }
          line = "Q211 = "+comb;
        }
        else if (tab[i].cats == "Age") {

          if (tab[i].id == 1) {
            line = "(C54 BETWEEN 1996 AND 2005)"
          }else if(tab[i].id == 2){
            line = "(C54 BETWEEN 1986 AND 1995)"
          }else if(tab[i].id == 3){
            line = "(C54 BETWEEN 1971 AND 1985)";
          }else{
            line = "(C54 < 1970 )"
          }

        }
        else if (tab[i].cats == "Cables") {

          let comb = "";                                                 
          for (let t=1; t <= 4; t++){ 
              if (t == (tab[i].id)) {
                  comb += "1-";
              } else {
                  comb += "0-";
              }
          }
          line = "Q206 = "+comb;

        }
        else if (tab[i].cats == "HautDiplome") {
          line = "C166_SQ2 = "+tab[i].id;
        }else if (tab[i].cats == "Status") {
          //cas du Status
          line = "C57 = "+tab[i].id;
        }else{
          line = "Request"
        }
        T.push(line)
      }
      
      return T;
    },
    filtreMSM(tab, single){
      let T = []
      for (let i = 0; i < single.length; i++) {
        if(single[i] == "Request"){
          T.push(i)
        }  
      }
      for (let i = 0; i < T.length; i++) {
        single[T[i]] = tab[i].name
      } 
      return single;
    },
    calculer(){
      this.start = true
      this.response = []
      this.loading = true
      let time = 0
      let self = this
      if (this.vagues.length == 0 || this.regions.length == 0 || this.jours.length == 0 ||
        this.cibles.length == 0 && this.MSM.length == 0 && this.chaines.length == 0 && this.stations.length == 0 || this.tranches.length == 0 || this.indicateurs.length == 0) {
        this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'mood_bad',
            message: 'Tous les elements de cibles doivent être selectionnés pour une requête complète',
            position: "center"
          })
          this.loading = false
          this.start = false
          this.compteur = 0
      }else{
        
        this.backup_cibles = this.cibles; //Tableau initiale des cibles dans l'ordre de selection

        let finalVague        =  this.vagues
        let finalRegion       =  this.filtreRegions(this.regions)
        let finalJour         =  this.filtreJours(this.jours)
        let finalCible        =  this.filtreMSM(this.MSM, this.filtreSingleCibles(this.cibles))
        let finalStation      =  this.filtreStations(this.stations)
        let finalChaine       =  this.filtreChaines(this.cibles)
        let finalTranche      =  this.filtreTranche(this.tranches)
        let finalIndicateur   =  this.indicateurs

        axios.post("http://localhost/cametrie/index.php", {
          env         : this.env,
          vagues      : finalVague,
          regions     : finalRegion,
          jours       : finalJour,
          cibles      : finalCible,
          stations    : finalStation,
          chaines     : finalChaine,
          tranches    : finalTranche,
          indicateurs : finalIndicateur,
        }).then(function (e){
          self.response = e.data.Resultat
          console.log(self.response);
          self.loading = false
          self.start = false
          self.$q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Requête executée en '+self.compteur+" secondes",
            position: "top-right"
          })
          
        }).catch(function(error){
          console.log(error);
          self.loading = false
        })
      }
      
    }
  }
}
</script>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap')
*
  font-family: 'Raleway', sans-serif
.drop-target
  height: 400px
  width: 100%
  min-width: 200px
  background-color: gainsboro
.loadCenter
  display: flex
  align-items: center
  justify-content: center
  height: "100vh"
</style>
