var myApp = angular.module('myApp', []);

function CommandCtrl($scope) {
	$scope.input = {data:'{A -> B;}'}; //make this an empty string for blank network
	$scope.parsed = function(data) {
		var relations = data.split(';');
		relations = relations.slice(0,relations.length-1);

		//Define Parts
		var parts = relations.map(function(d) {
		  return d.split('->');
		});

		// Get Nodes
		var nodes = _.unique(_.flatten(parts).map(function(e) {
  			return e.trim();
		})).map(function(d) {
  			return d.trim();
		});

		// Get edges for part
		var edges = parts.map(function(d) {
  			return {'from':nodes.indexOf(d[0].trim())+1,'to':nodes.indexOf(d[1].trim())+1};
		});

		//Let's make a structure for the nodes
		var nodeObj = nodes.map(function(d) {
			return {"id":nodes.indexOf(d.trim())+1,"label":d, "title":'id'+nodes.indexOf(d.trim())+1};
		});


		return {nodeElements:nodeObj, edgeElements:edges};
	};


    $scope.ohthehumanity = function(Innodes,Inedges) {
			  // create a network
			  var container = document.getElementById('mynetwork');
			  var data= {
			    nodes: Innodes,
			    edges: Inedges,
			  };
			  var options = {
			    width: '70%',
			    height: '100%',
			    // hierarchicalLayout: {
       //      		direction: "UD"
       //  		}
			  };
			  var network = new vis.Network(container, data, options);
    }

    $scope.dotParser = function(dotdata) {
			  // create a network
			  var container = document.getElementById('mynetwork');
			  var data= {
			    dot:dotdata
			  };
			  var options = {
			    width: '70%',
			    height: '100%',
			    // hierarchicalLayout: {
       //      		direction: "UD"
       //  		}
		       tooltip: {
		            delay: 200,
		            fontSize: 12,
		            color: {
		                background: "#fff"
		                }
		            }
			  };
			  var network = new vis.Network(container, data, options);
    }




}

//http://stackoverflow.com/questions/24396708/zoomable-network-graph-in-angularjs
//http://stackoverflow.com/questions/18967127/angularjs-when-to-pass-scope-variable-to-function



// #Special Relations
// A -D-> B = "APP catalysis"
// A -X-> B = "Neuron Repression"
// L1 = XOR

// #Style
// rs34234 {color:'red'}


// NOTCH2 -> Protein1;
// Protein1 -> Protein2;
// Protein3 -> Protein2;
// rs34234 -XOR-> L1;
// rs34230 -XOR-> L1;
// L1 -> Protein1;


// Paul Fearn -> Nikhil Gopal;
// Paul Fearn -> Paul Shannon;
// Paul Fearn -> Hamid Bolouri;
// Paul Shannon -> Nithin Baliga;
// Nikhil Gopal -> Jeff Heer;
// Nikhil Gopal -> David Mack;
// David Mack -> Tony Blau;
// David Mack -> Chuck Murray;
// Nikhil Gopal -> David Beck;
// David Beck -> Mary Lindstrom;
// David Beck -> Aaron Perry;
// David Beck -> Herb Sauro;
// Nikhil Gopal -> Elhanan Borenstein;
// Elhanan Borenstein -> Sharon Greenblum;
// Paul Shannon -> Bill Longabough;
// Hamid Bolouri -> Bill Longabough;
// Nikhil Gopal -> Mike Galdzicki;
// Nikhil Gopal -> Atul Butte;
// Atul Butte -> Eric Schadt;
// Atul Butte -> Trey Ideker;
// Nikhil Gopal -> John Stam;
// Nikhil Gopal -> Stan Gu;
// Nikhil Gopal -> David Williamson;
// Nikhil Gopal -> Bill Noble;
// Nikhil Gopal -> Ali Shojaie;
// Jeff Heer -> Natalie Richie;
// Jeff Heer -> Jevin West;


// {
// node [shape=box];
// oxaloacetate[color=orange] -> citrate [label=oxidation,color=green];
// citrate -> isocitrate [label=oxidation,color=green];
// isocitrate -> alpha_ketoglutarate;
// alpha_ketoglutarate -> succinyl_CoA;
// succinyl_CoA -> succinate;
// succinate -> fumarate;
// fumarate -> malate;
// malate -> oxaloacetate [label=reduction,color=red];
// NADH [shape=star,value=5] -> succinate [color=purple];
// }



// {
// http://www.ebi.ac.uk/Tools/webservices/psicquic/view/main.xhtml?conversationContext=1#

// Reactome -> APID [label=PSIQUIC,color=green];
// Reactome -> BAR [label=PSIQUIC,color=green];
// Reactome -> bhf_ucl [label=PSIQUIC,color=green];
// Reactome -> BIND [label=PSIQUIC,color=green];
// Reactome -> BindingDB [label=PSIQUIC,color=green];
// Reactome -> BioGrid [label=PSIQUIC,color=green];
// Reactome -> ChEMBL [label=PSIQUIC,color=green];
// Reactome -> DIP [label=PSIQUIC,color=green];
// Reactome -> DrugBank [label=PSIQUIC,color=green];
// Reactome -> GeneMANIA [label=PSIQUIC,color=green];
// Reactome -> HPIDb [label=PSIQUIC,color=green];
// Reactome -> I2D [label=PSIQUIC,color=green];
// Reactome -> I2D_IMEx [label=PSIQUIC,color=green];
// Reactome -> InnateDB [label=PSIQUIC,color=green];
// Reactome -> InnateDB_IMEx [label=PSIQUIC,color=green];
// Reactome -> IntAct [label=PSIQUIC,color=green];
// Reactome -> Interoporc [label=PSIQUIC,color=green];
// Reactome -> iRefIndex [label=PSIQUIC,color=green];
// Reactome -> MatrixDB [label=PSIQUIC,color=green];
// Reactome -> MBInfo [label=PSIQUIC,color=green];
// Reactome -> mentha [label=PSIQUIC,color=green];
// Reactome -> MINT [label=PSIQUIC,color=green];
// Reactome -> MolCon [label=PSIQUIC,color=green];
// Reactome -> MPIDB [label=PSIQUIC,color=green];
// Reactome -> Reactome_FIs [label=PSIQUIC,color=green];
// Reactome -> Spike [label=PSIQUIC,color=green];
// Reactome -> STRING [label=PSIQUIC,color=green];
// Reactome -> TopFind [label=PSIQUIC,color=green];
// Reactome -> UniProt [label=PSIQUIC,color=green];
// Reactome -> VirHostNet [label=PSIQUIC,color=green];
// }


// KEGG_BRITE
// KEGG_COMPOUND
// KEGG_PATHWAY
// KEGG_MODULE
// KEGG_DISEASE
// KEGG_ENZYME
// KEGG_REACTION
// KEGG_ORTHOLOGY


// # Pathway Resources
// Reactome [shape=dot,color=red];
// KEGG [shape=dot,color=red];
// WikiPathways [shape=dot,color=red];
// # Standards
// PSIQUIC [shape=box,color=green];
// PSI_MITAB [shape=box,color=green];
// BioPAX [shape=box,color=green];
// SBML [shape=box,color=green];
// SBGN [shape=box,color=green];

// PSIQUIC -> Reactome;
// KEGG -> GO;
// Reactome -> ENSEMBL [label=directMapping];
// Reactome -> UniProt [label=directMapping];
// Reactome -> ChEBI [label=directMapping];
// BioPAX -> Reactome;
// BioPAX -> WikiPathways;
// PSI_MITAB -> Reactome;
// SBML -> Reactome;
// SBGN -> Reactome;
// PSIQUIC -> APID;
// PSIQUIC -> BAR;
// PSIQUIC -> bhf_ucl;
// PSIQUIC -> BIND;
// PSIQUIC -> BindingDB; 
// PSIQUIC -> BioGrid;
// PSIQUIC -> ChEMBL;
// PSIQUIC -> DIP;
// PSIQUIC -> DrugBank;
// PSIQUIC -> GeneMANIA; 
// PSIQUIC -> HPIDb;
// PSIQUIC -> I2D;
// PSIQUIC -> I2D_IMEx;
// PSIQUIC -> InnateDB;
// PSIQUIC -> InnateDB_IMEx;
// PSIQUIC -> IntAct;
// PSIQUIC -> Interoporc;
// PSIQUIC -> iRefIndex;
// PSIQUIC -> MatrixDB;
// PSIQUIC -> MBInfo;
// PSIQUIC -> mentha;
// PSIQUIC -> MINT;
// PSIQUIC -> MolCon;
// PSIQUIC -> MPIDB;
// PSIQUIC -> Reactome_FI;
// PSIQUIC -> Spike;
// PSIQUIC -> STRING;
// PSIQUIC -> TopFind;
// PSIQUIC -> UniProt;
// PSIQUIC -> VirHostNet;




