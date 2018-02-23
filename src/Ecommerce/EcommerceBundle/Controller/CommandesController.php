<?php

namespace Ecommerce\EcommerceBundle\Controller;

use Ecommerce\EcommerceBundle\Entity\Commandes;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CommandesController extends Controller
{
    public function facture(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $generator = $this->container->get(random_bytes(10));
        $session = $request->getSession();
        $adresse = $session->get('adresse');
        $panier = $session->get('panier');
        $commande = array();
        $totalHT = 0;
        $totalTTC = 0;

        $facturation = $em->getRepository('EcommerceBundle:UtilisateursAdresses')->find($adresse['facturation']);
        $livraison = $em->getRepository('EcommerceBundle:UtilisateursAdresses')->find($adresse['livraison']);
        $produits = $em->getRepository('EcommerceBundle:Produits')->findArray(array_keys($session->get('panier')));

        foreach ($produits as $produit)
        {
            $prixHT = ($produit->getPrix()* $panier[$produit->getId()]);
            $prixTTC = ($produit->getPrix()* $panier[$produit->getId()] / $produit->getTva()->getMultiplicate());
            $totalHT += $prixHT ;
            $totalTva = $totalTTC - $totalHT;

            $commande['produit'][$produit->getId()] = array('reference' => $produit->getNom(),
                                                            'quantite' => $panier[$produit->getId()],
                                                            'prixHT' => round($produit->getPrix(),2),
                                                            'prixTTC' => round($produit->getPrix() / $produit->getTva()->getMultiplicate(),2));

            $commande['livraison'] = array('prenom' => $livraison->getPrenom(),
                                            'nom' => $livraison->getNom(),
                                            'telephone' => $livraison->getTelephone(),
                                            'adresse' => $livraison->getAdresse(),
                                            'cp' => $livraison->getCp(),
                                            'ville' => $livraison->getVille(),
                                            'pays'=>$livraison->getPays(),
                                            'complement' => $livraison->getComplement());
            $commande['facturation'] = array('prenom' => $livraison->getPrenom(),
                                            'nom' => $livraison->getNom(),
                                            'telephone' => $livraison->getTelephone(),
                                            'adresse' => $livraison->getAdresse(),
                                            'cp' => $livraison->getCp(),
                                            'ville' => $livraison->getVille(),
                                            'pays'=>$livraison->getPays(),
                                            'complement' => $livraison->getComplement());

        }


    }
    public function prepareCommandeAction(Request $request)
    {
        $session = $request->getSession();
        $em = $this->getDoctrine()->getManager();

        if(!$session->has('commande'))
            $commande = new Commandes();
        else
            $commande = $em->getRepository('EcommerceBundle:Commandes')->findBy($session->get('commande'));

        $commande->setDate(new \DateTime());
        $commande->setUtilisateur($this->container->get('security.token_storage')->getToken()->getUser());
        $commande->setValider(0);
        $commande->setReference(0);
        $commande->setCommande($this->facture());

        if (!$session->has('commande'))
        {
            $em->persist($commande);
            $session->set('commande',$commande);
        }

        $em->flush();
        return new Response($commande->getId());
    }
}
