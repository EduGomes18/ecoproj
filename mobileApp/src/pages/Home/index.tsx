import React, { useState, useEffect } from "react";
import { RectButton } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { SvgUri } from "react-native-svg";
import Logo from "../../assets/logo.svg";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";

const Home = () => {
  const { navigate } = useNavigation();

  function handleNavigate() {
    navigate("Points", { uf: selectedUf, city: selectedCity });
  }

  interface IBGRes {
    sigla: string;
  }
  interface IBGResCity {
    nome: string;
  }

  interface Ufs {
    label: string;
    value: string;
  }

  interface Cities {
    label: string;
    value: string;
  }

  const [ufs, setUfs] = useState<Ufs[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");

  const [selectedCity, setSelectedCity] = useState("0");

  const [cities, setCities] = useState<Cities[]>([]);

  useEffect(() => {
    axios
      .get<IBGRes[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
      )
      .then((res) => {
        const ufInitials = res.data.map((uf) => {
          return { label: uf.sigla, value: uf.sigla };
        });

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    axios
      .get<IBGResCity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        const cityName = res.data.map((city) => {
          return { label: city.nome, value: city.nome };
        });

        setCities(cityName);
      });
  }, [selectedUf]);

  function handleUf(e: string) {
    setSelectedUf(e);
  }
  function handleCity(e: string) {
    setSelectedCity(e);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        imageStyle={{ width: 274, height: 368 }}
        style={styles.container}
      >
        <View style={styles.main}>
          <Logo width={100} height={42} />
          <View>
            <Text style={styles.title}>Your waste collection marketplace!</Text>
            <Text style={styles.description}>
              We help people to find collection points efficiently
            </Text>
          </View>
          <View style={styles.select}>
            <RNPickerSelect
              placeholder={{ label: "Select an UF" }}
              onValueChange={handleUf}
              items={ufs}
            />
            <RNPickerSelect
              placeholder={{ label: "Select a City" }}
              onValueChange={handleCity}
              items={cities}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleNavigate}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Enter</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    marginTop: 32,
  },

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
