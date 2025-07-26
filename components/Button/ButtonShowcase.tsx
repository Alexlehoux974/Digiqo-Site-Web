import { Button } from './Button'
import { ChevronRight, Download, Heart, Send, ArrowRight } from 'lucide-react'

export const ButtonShowcase = () => {
  return (
    <div className="p-8 space-y-12 bg-digiqo-gray-light rounded-2xl">
      <div>
        <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Boutons Principaux</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">
            Je veux booster mes ventes
          </Button>
          <Button variant="primary" rightIcon={<ChevronRight className="w-5 h-5" />}>
            Demander un devis
          </Button>
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-6 h-6" />}>
            Commencer maintenant
          </Button>
          <Button variant="primary" isLoading>
            Chargement
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Boutons Secondaires</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary">
            En savoir plus
          </Button>
          <Button variant="secondary" leftIcon={<Download className="w-5 h-5" />}>
            Télécharger le guide
          </Button>
          <Button variant="secondary" size="sm">
            Voir les détails
          </Button>
        </div>
      </div>

      <div className="bg-digiqo-primary p-8 rounded-xl">
        <h3 className="text-2xl font-bold text-white mb-6">Boutons Ghost (sur fond sombre)</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="ghost">
            Voir nos réussites
          </Button>
          <Button variant="ghost" rightIcon={<Send className="w-5 h-5" />}>
            Nous contacter
          </Button>
          <Button variant="ghost" size="lg">
            Découvrir l'agence
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Boutons Subtils</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="subtle">
            Option 1
          </Button>
          <Button variant="subtle" leftIcon={<Heart className="w-5 h-5" />}>
            J'aime
          </Button>
          <Button variant="subtle" size="sm">
            Filtrer
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Tailles</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Petit</Button>
          <Button size="md">Moyen (défaut)</Button>
          <Button size="lg">Grand</Button>
          <Button size="xl">Très grand</Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-digiqo-primary mb-6">États</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Désactivé</Button>
          <Button isLoading>En cours</Button>
          <Button variant="danger">Supprimer</Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Pleine largeur</h3>
        <div className="space-y-4 max-w-md">
          <Button fullWidth>Bouton pleine largeur</Button>
          <Button variant="secondary" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
            Continuer vers l'étape suivante
          </Button>
        </div>
      </div>
    </div>
  )
}